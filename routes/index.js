var express = require('express');
var router = express.Router();

const msRestAzure = require('ms-rest-azure');
const SQLManagement = require("azure-arm-sql");

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.render('index');
});

module.exports = router;
