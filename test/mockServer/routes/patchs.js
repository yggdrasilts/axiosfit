const express = require('express');
const router = express.Router();

const buildUrl = require('./../utils/utils').buildUrl;

const testRoutes = require('./../services/TestRoutes').TestRoutes;

const testData = require('./../data/testData.json');

router.patch(buildUrl(testRoutes.BASE, testRoutes.PATCH.REQUEST.URL), function (req, res) {
  res.json(testData.PATCH.performPatchRequest.check);
});

module.exports = router;
