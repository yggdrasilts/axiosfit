const express = require('express');
const router = express.Router();

const testRoutes = require('./../services/TestRoutes').TestRoutes;

const testData = require('./../data/testData.json');

router.get(testRoutes.GET.REQUEST.URL, function (req, res) {
  res.send(testData.GET.performGetRequest.check);
});

router.get(testRoutes.GET.ERROR.URL, function (req, res) {
  res.status(500).send('Something broke!');
});

module.exports = router;
