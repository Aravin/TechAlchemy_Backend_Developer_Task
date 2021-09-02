const sb = require('@supabase/supabase-js');
require('dotenv').config();

// Create a single supabase client for interacting with your database 
const supabase = sb.createClient(process.env.SB_URL, process.env.SB_KEY);

module.exports.register = async function register(email, password) {
    const { user, session, error } = await supabase.auth.signUp({
        email,
        password,
    })

    if (error) {
        return [false, error.message];
    }

    return [true, session.access_token]; // it also supports refresh token.
}

module.exports.login =  async function login(email, password) {
    const { user, session, error } = await supabase.auth.signIn({
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
    const { user, data, error  } = await supabase.auth.api.getUserByCookie()

    if (error) {
        return [false, error.message];
    }

    return [true, user]; 
}

// register('aravin@one.com', 'aravind');
// login('aravin@one.com', 'aravind');
// logout('xeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjMwNjA4MTYxLCJzdWIiOiIzMmU0NDRjMi1lZDI0LTQ2MmUtYmZlMy1lMzY1N2EwZWI3MGMiLCJlbWFpbCI6ImFyYXZpbkBvbmUuY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCJ9LCJ1c2VyX21ldGFkYXRhIjp7fSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQifQ.2TlnBXUyQ_BZuj4MivxZPfX9toj0gE2N6-GY-ICk5bE')
// session('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjMwNjA4NTE1LCJzdWIiOiIzMmU0NDRjMi1lZDI0LTQ2MmUtYmZlMy1lMzY1N2EwZWI3MGMiLCJlbWFpbCI6ImFyYXZpbkBvbmUuY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCJ9LCJ1c2VyX21ldGFkYXRhIjp7fSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQifQ.wVlzu1YEJ_mAUk_QS4Rr8qC3jZ-14DD9uRHXdtCW_4w')