const sb = require('@supabase/supabase-js');
require('dotenv').config();

// Create a single supabase client for interacting with your database 
const supabase = sb.createClient(process.env.SB_URL, process.env.SB_KEY);

module.exports.register = async function register(email, password) {

    if (!email) return [false, 'Email Address is Required'];

    if (!password) return [false, 'Password is Required'];

    const { session, error } = await supabase.auth.signUp({
        email,
        password,
    })

    if (error) return [false, error.message];

    return [true, session.access_token]; // it also supports refresh token.
}

module.exports.login = async function login(email, password) {

    if (!email) return [false, 'Email Address is Required'];

    if (!password) return [false, 'Password is Required'];

    const { session, error } = await supabase.auth.signIn({
        email,
        password,
    })

    if (error) return [false, error.message];

    return [true, session?.access_token];
}

// temp workaround
// storing the invalidated token to db
module.exports.logout = async function logout(token) {

    if (!token) return [false, 'Token is Required'];

    const { error } = await supabase
        .from('invalidated_tokens')
        .upsert({token: token})

    if (error) return [false, error.message];

    return [true, 'Success'];
}

module.exports.expiredTokens = async function expiredTokens(token) {

    if (!token) return [false, 'Token is Required'];

    const { data, error } = await supabase
        .from('invalidated_tokens')
        .select()
        .eq('token', token);

    if (error) return [false, error.message];

    if (data.length) return [false, 'Token Expired'];

    return [true, 'Success'];
}

