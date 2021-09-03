const sb = require('@supabase/supabase-js');
require('dotenv').config();

// Create a single supabase client for interacting with your database 
const supabase = sb.createClient(process.env.SB_URL, process.env.SB_KEY);

module.exports.register = async function register(email, password) {
    const { session, error } = await supabase.auth.signUp({
        email,
        password,
    })

    if (error) {
        return [false, error.message];
    }

    return [true, session.access_token]; // it also supports refresh token.
}

module.exports.login =  async function login(email, password) {
    const { session, error } = await supabase.auth.signIn({
        email,
        password,
    })

    if (error) {
        return [false, error.message];
    }

    return [true, session.access_token]; 
}

module.exports.logout =  async function logout(token) {
    const { error  } = await supabase.auth.api.signOut(token);

    if (error) {
        return [false, error.message];
    }

    return [true, 'Success']; 
}

module.exports.session = async function session() {
    const { user, error  } = await supabase.auth.api.getUserByCookie()

    if (error) {
        return [false, error.message];
    }

    return [true, user]; 
}
