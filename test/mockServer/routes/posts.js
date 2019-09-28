const express = require('express');
const router = express.Router();

const buildUrl = require('./../utils/utils').buildUrl;

const testRoutes = require('./../services/TestRoutes').TestRoutes;

const testData = require('./../data/testData.json');

router.post(buildUrl(testRoutes.BASE, testRoutes.POST.REQUEST.URL), function (req, res) {
  res.json(testData.POST.performPostRequest.check);
});


module.exports = router;
