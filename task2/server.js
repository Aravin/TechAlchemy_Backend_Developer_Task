const express = require('express');
const router = require('./routing');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser')

require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use('/v1', router);

const port = 3000;

app.listen(port, () => {
    console.log(`Weather and News App listening at http://localhost:${port}`)
});
