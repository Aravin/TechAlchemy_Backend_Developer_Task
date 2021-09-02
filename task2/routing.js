const express = require('express');
const router = express.Router();
const { weatherLookup } = require('./lib/weatherLookup');
const { newsLookup } = require('./lib/newsLookup');
const { login, register, session, logout } = require('./helpers/supabase');
const { auth } = require('./middlewares/jwt');

router.get('/health', async (req, res) => {
    await session();
    res.send('Service is up and running...')
});

router.post('/login', async (req, res) => {
    const loginResult = await login(req.body.email, req.body.pass);

    if (!loginResult[0]) {
        res.status(404).send({error: loginResult[1]});
    } else {
        res.send({token: loginResult[1]});
    }
});

router.post('/register', async (req, res) => {
    const loginResult = await register(req.body.email, req.body.pass);

    if (!loginResult[0]) {
        res.status(404).send({error: loginResult[1]});
    } else {
        res.send({token: loginResult[1]});
    }
});

router.post('/register', async (req, res) => {
    const loginResult = await register(req.body.email, req.body.pass);

    if (!loginResult[0]) {
        res.status(404).send({error: loginResult[1]});
    } else {
        res.send({token: loginResult[1]});
    }
});

router.post('/logout', async (req, res) => {
    const logOut = await logout(req.body.token);

    res.send({status: 'Success'});
});

router.get('/weather', async function (req, res) {
    await weatherLookup(req, res);
});

router.get('/news', auth, async function (req, res) {
    await newsLookup(req, res);
});

module.exports = router;