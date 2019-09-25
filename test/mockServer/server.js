const methodsRoutes = require('./services/MethodsRoutes').MethodsRoutes;

const express = require('express');
const bodyParser = require('body-parser')
const app = express();

const testData = require('./testData.json');

console.log(testData);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}))

// parse application/json
app.use(bodyParser.json())

const buildUrl = (base, url) => {
  return base + url;
};

app.get(methodsRoutes.GET.REQUEST.URL, function (req, res) {
  res.send(testData.GET.performGetRequest.check);
});

/*app.get(methodsRoutes.GET.REQUEST.URL, function (req, res) {
  res.status(500).send('Something broke!');
});*/

app.delete(buildUrl(methodsRoutes.BASE, methodsRoutes.DELETE.REQUEST.URL), function (req, res) {
  res.send(testData.DELETE.performDeleteRequest.check);
});

app.head(buildUrl(methodsRoutes.BASE, methodsRoutes.HEAD.REQUEST.URL), function (req, res) {
  res.send(testData.HEAD.performHeadRequest.check);
});

app.get(buildUrl(methodsRoutes.BASE, methodsRoutes.GET.REQUEST.URL), function (req, res) {
  res.send(testData.GET.performGetRequest.check);
});

app.post(buildUrl(methodsRoutes.BASE, methodsRoutes.POST.REQUEST.URL), function (req, res) {
  res.json(testData.POST.performPostRequest.check);
});

app.put(buildUrl(methodsRoutes.BASE, methodsRoutes.PUT.REQUEST.URL), function (req, res) {
  res.json(testData.PUT.performPutRequest.check);
});

app.patch(buildUrl(methodsRoutes.BASE, methodsRoutes.PATCH.REQUEST.URL), function (req, res) {
  res.json(testData.PATCH.performPatchRequest.check);
});

app.get(buildUrl(methodsRoutes.BASE, methodsRoutes.GET.WITH_REQUEST_INTERCEPTOR.URL), function (req, res) {
  res.json({
    headers: req.headers
  });
});

app.get(buildUrl(methodsRoutes.BASE, methodsRoutes.GET.WITH_RESPONSE_INTERCEPTOR.URL), function (req, res) {
  res.json(testData.GET.performGetRequestAddingResInterceptor.check);
});

app.get(buildUrl(methodsRoutes.BASE, methodsRoutes.GET.WITH_PARAM.URL), function (req, res) {
  res.send(testData.GET.performGetRequestUsingAPathVariable.check);
});

app.get(buildUrl(methodsRoutes.BASE, methodsRoutes.GET.WITH_PARAMS.URL), function (req, res) {
  res.send(testData.GET.performGetRequestUsingPathVariables.check);
});

app.listen(3000, function () {
  console.log('Mock Server listening on port 3000!');
});
