//jshint esversion: 6

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;

  var data = {
    'members': [
      {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
        }
      }
    ],
  }

  var jsonData = JSON.stringify(data)

  console.log(firstName, lastName, email);
  var options = {
    url: 'https://us10.api.mailchimp.com/3.0/lists/6403da64ca',
    method: 'POST',
    headers: {
      'Authorization': "anand1 e270a4b003fb4d4cb1afdd9325b875c6-us10"
    },
    body: jsonData
  }

  request(options, function(error, response, body) {
    if (error) {
      console.log(error);
      res.sendFile(__dirname + "/failure.html");
    } else {
      if(response.statusCode == 200){
        res.sendFile(__dirname + "/success.html");
      }else{
        res.sendFile(__dirname + "/failure.html");
      }
    }
  });
});

app.post("/failure.html", function(req, res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running");
});


//apikey: e270a4b003fb4d4cb1afdd9325b875c6-us10
// list id :6403da64ca
