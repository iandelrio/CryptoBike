let express = require('express');
let router = express.Router();
let fs = require('fs');
let path = require('path');

const msRestAzure = require('ms-rest-azure');
const SQLManagement = require("azure-arm-sql");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/bike_form', (req, res) => {
  console.log(':\'(');
  
  let html_path = path.join(__dirname, '..', 'views', 'login_modal.html');
  fs.readFile(html_path, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
    }
    console.log(data);
    res.status(200).send(data);
  }).catch((err) => {
    res.status(500).send(err);
  });
})

/* POST test */
router.post('/test', function(req, res, next) {
  res.send(req.body)
});

/* Book Bike */
router.post('/book_bike', function(req, res, next) {
  console.log(req.body);
  res.status(200).send('Booked');
});

module.exports = router;
