require('dotenv').config();
const { httpGET } = require('./../helpers/http');
const newsEndpoint = `https://newsapi.org/v2/top-headlines?country=IN&apiKey=${process.env.NEWS_API_KEY}&q=`;

exports.newsLookup = async function newsLookup(req, res) {

    let search = req.query?.search || '';

    let resp = await httpGET(newsEndpoint + search);

    if (!resp[0]) {
        return res.status(400).send(resp[1]);
    } else {
        return res.send(parseNewsResult(resp[1].articles));
    }
}

function parseNewsResult(newsList) {

    let formattedNews = [];

    for (let news of newsList) {

        const headline = news.title;
        const link = news.url;

        formattedNews.push({headline, link});
    }

    return {
        count: formattedNews.length,
        data: formattedNews,
    };
}