const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

/** Init **/

let app = express();

const port = 3000;

// express config

// CORS policy
let allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

app
  .use(express.static('/var/www/html/dist'))
  .use(allowCrossDomain)
  .use(bodyParser.urlencoded());

//nodemailer config 
// set up mail sender
var transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 465,
  secure: true,
  auth: {
    user: 'sdlt.mail.info@gmail.com',
    pass: 'Super Secret SDLT PASS'
  }
});

let path = '/var/www/html';

/** File Serving Routes **/

app.get('/', (req, res) => {
  res.sendFile(path + '/index.html');
});

app.post('/contact', (req, res) => {

  console.log(req.body);
  if(!exists(req.body)) {
    res.status(400).send("Error: no request body\n");
    return;
  }
  // get contact information
  let 
    email = req.body.email,
    name = req.body.name,
    msg = req.body.message;

  // can assume email is valid

  var mailOptions = {
    from: 'info@SDLT.ai',
    to: 'govind@sdlt.ai',
    subject: 'New email from ' + name,
    text: 'Sender: ' + email + '\n\n Message: ' +  msg
  };
  

  transporter.sendMail(mailOptions, function(err, info) {
    if(err){
      res.status(500).send('Error: SMTP failure\n')
      return console.log(err);
    }
    console.log('Message sent: ' + info.response);
    res.status(200).send()
  });
});

/* Server Config */
app.listen(port, () => {
  console.log('listening on port ' + port);
});

/* Helpers */

// Checks if an object exists
let exists = (obj) => {
  if (obj === null || obj === undefined || obj === '') {
    return false;
  }
  return true;
}
