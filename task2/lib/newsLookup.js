const { httpGET } = require('./../helpers/http');
const newsEndpoint = `https://newsapi.org/v2/top-headlines?country=IN&apiKey=5816f0633bb447699d1046a0b72b17bf&q=`;

exports.newsLookup = async function newsLookup(req, res) {

    let search = '';

    if (req.query.search) {
        search = req.query.search;
    }

    let resp = await httpGET(newsEndpoint + search);

    if (!resp[0]) {
        res.status(400).send(resp[1]);
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