const axios = require('axios');
const memory = require('./cache');

exports.httpGET = async function httpGET(url) {

    let resp = [];

    if (memory.cache.get(url)) {
        return [true, memory.cache.get(url)];
    }
    
    await axios.get(url)
        .then((response) => {
            // handle success
            resp = [true, response?.data];
            memory.cache.put(url, response?.data, parseInt(process.env.CACHE_TIME, 10) || 60000);
        })
        .catch((error) => {
            // handle error
            resp = [false, error.message]
        });

    return resp;
}