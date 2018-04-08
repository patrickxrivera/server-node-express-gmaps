import bodyParser from 'body-parser';
import express from 'express';

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ success: true });
});

if (!module.parent) {
  app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
  });
}

module.exports = app;
