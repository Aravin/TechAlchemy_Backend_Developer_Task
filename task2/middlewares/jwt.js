const jwt = require('jsonwebtoken');
const sb = require('./../helpers/supabase');

module.exports.auth = function authentication(req, res, next) {
    // get the bearer token
    const authHeader = req.headers['authorization'];
    // remove the prefix bearer
    const token = authHeader && authHeader.split(' ')[1];

    // return unauthorized in token is not found
    if (!token) return res.sendStatus(401);

    if (sb.expiredTokens(token)) return res.sendStatus(403);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        
        // return forbidden if token is invalid or expired.
        if (err) return res.sendStatus(403);
        req.user = user;
        
        // if success, continue to API
        next();
    })
}