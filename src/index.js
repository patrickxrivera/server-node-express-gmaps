import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';

import mountRoutes from './routes';

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mountRoutes(app);

console.log(`API listening on port: ${port}`);

app.listen(port);

module.exports = app;
