const methodsRoutes = require('./services/MethodsRoutes').MethodsRoutes;

const express = require('express');
const app = express();

const buildUrl = (base, url) => {
  return base + url;
};

app.get(buildUrl(methodsRoutes.BASE, methodsRoutes.GET.DEMO.URL), function (req, res) {
  res.send('noParameters');
});

app.get(buildUrl(methodsRoutes.BASE, methodsRoutes.GET.WITH_PARAM.URL), function (req, res) {
  res.send(`with param: ${req.params.id}`);
});

app.get(buildUrl(methodsRoutes.BASE, methodsRoutes.GET.WITH_PARAMS.URL), function (req, res) {
  res.send(`with params: ${req.params.id}, ${req.params.id2}`);
});

app.listen(3000, function () {
  console.log('Mock Server listening on port 3000!');
});
