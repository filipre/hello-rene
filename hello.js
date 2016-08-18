var express = require('express');
var app = express();

var request = require('request');

var pushoverUrl = 'https://api.pushover.net/1/messages.json'
var pushoverToken = process.env.PUSHOVER_TOKEN;
var pushoverUser = process.env.PUSHOVER_USER;
var pushoverMessage = "Hello René :)"

var timeBetweenHello = 5 * 60 * 1000

var lastHello = Date.now()

app.get('/', function (req, res)) {
  res.send("Go to /hello to send René a Hello!");
}

app.get('/hello', function (req, res) {
  var currentTime = Date.now();

  if(currentTime - lastHello < timeBetweenHello) {
    res.send("Sorry! Someone else already said Hello to René :( Maybe you could try it in 5 minutes again?");
    return
  }

  lastHello = Date.now();
  request.post('http://service.com/upload').form({token:pushoverToken, user:pushoverUser, message:pushoverMessage});
  res.send("You just said Hello to René! How awesome is that?");
});

app.listen(3000, function () {
  console.log("Ready to receive some \"Hello\"s!");
});
