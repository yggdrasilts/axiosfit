const testRoutes = require('./services/TestRoutes').TestRoutes;

const express = require('express');
const bodyParser = require('body-parser')
const app = express();

const utils = require('./utils/utils');
const buildUrl = utils.buildUrl;

const testData = require('./data/testData.json');

const gets = require('./routes/gets');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}))

// parse application/json
app.use(bodyParser.json())

app.use('/', gets);
/*app.get(testRoutes.GET.REQUEST.URL, function (req, res) {
  res.send(testData.GET.performGetRequest.check);
});

app.get(testRoutes.GET.ERROR.URL, function (req, res) {
  res.status(500).send('Something broke!');
});*/

app.delete(buildUrl(testRoutes.BASE, testRoutes.DELETE.REQUEST.URL), function (req, res) {
  res.send(testData.DELETE.performDeleteRequest.check);
});

app.head(buildUrl(testRoutes.BASE, testRoutes.HEAD.REQUEST.URL), function (req, res) {
  res.send(testData.HEAD.performHeadRequest.check);
});

app.get(buildUrl(testRoutes.BASE, testRoutes.GET.REQUEST.URL), function (req, res) {
  res.send(testData.GET.performGetRequest.check);
});

app.post(buildUrl(testRoutes.BASE, testRoutes.POST.REQUEST.URL), function (req, res) {
  res.json(testData.POST.performPostRequest.check);
});

app.put(buildUrl(testRoutes.BASE, testRoutes.PUT.REQUEST.URL), function (req, res) {
  res.json(testData.PUT.performPutRequest.check);
});

app.patch(buildUrl(testRoutes.BASE, testRoutes.PATCH.REQUEST.URL), function (req, res) {
  res.json(testData.PATCH.performPatchRequest.check);
});

app.get(buildUrl(testRoutes.BASE, testRoutes.GET.WITH_REQUEST_INTERCEPTOR.URL), function (req, res) {
  res.json({
    headers: req.headers
  });
});

app.get(buildUrl(testRoutes.BASE, testRoutes.GET.WITH_RESPONSE_INTERCEPTOR.URL), function (req, res) {
  res.json(testData.GET.performGetRequestAddingResInterceptor.check);
});

app.get(buildUrl(testRoutes.BASE, testRoutes.GET.WITH_PARAM.URL), function (req, res) {
  res.send(testData.GET.performGetRequestUsingAPathVariable.check);
});

app.get(buildUrl(testRoutes.BASE, testRoutes.GET.WITH_PARAMS.URL), function (req, res) {
  res.send(testData.GET.performGetRequestUsingPathVariables.check);
});

app.listen(3000, function () {
  console.log('Mock Server listening on port 3000!');
});
