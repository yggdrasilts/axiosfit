const testRoutes = require('./services/TestRoutes').TestRoutes;

const express = require('express');
const bodyParser = require('body-parser')
const app = express();

const buildUrl = require('./utils/utils').buildUrl;

const testData = require('./data/testData.json');

const gets = require('./routes/gets');
const deletes = require('./routes/deletes');
const heads = require('./routes/heads');
const posts = require('./routes/posts');
const puts = require('./routes/puts');
const patchs = require('./routes/patchs');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}))

// parse application/json
app.use(bodyParser.json())

app.use('/', gets);
app.use('/', deletes);
app.use('/', heads);
app.use('/', posts);
app.use('/', puts);
app.use('/', patchs);

app.listen(3000, function () {
  console.log('Mock Server listening on port 3000!');
});
