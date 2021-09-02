const axios = require('axios');

exports.httpGET = async function httpGET(url) {

    let resp = [];
    
    await axios.get(url)
        .then(function (response) {
            // handle success
            resp = [true, response?.data];
        })
        .catch(function (error) {
            // handle error
            resp = [false, error.message]
        });


    return resp;
}