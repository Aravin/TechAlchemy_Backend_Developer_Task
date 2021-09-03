const axios = require('axios');

exports.httpGET = async function httpGET(url) {

    let resp = [];
    
    await axios.get(url)
        .then((response) => {
            // handle success
            resp = [true, response?.data];
        })
        .catch((error) => {
            // handle error
            resp = [false, error.message]
        });

    return resp;
}