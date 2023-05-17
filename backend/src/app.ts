import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import apiRouter from './api/router';

const port = process.env.PORT || 4000;

const app = express();

// parse JSON and url-encoded query
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

// print the request log on console
app.use(morgan('dev'));

// index page, just for testing
app.get('/', (_, res) => {
    res.send('Api is running')
})

// configure api router
app.use('/', apiRouter);

// open the server
app.listen(port, () => {
    console.log(`Express is running on port ${port}`);
})
