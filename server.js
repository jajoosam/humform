// server.js
// where your node app starts

// init project
var JSONdb = require('simple-json-db');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var db = new JSONdb('db.json');
var pug = require('pug');
var compil = pug.compileFile('views/plan.pug');
var result = {};
result = JSON.parse(db.JSON());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug');
// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html


// http://expressjs.com/en/starter/basic-routing.html
app.get("/plan", function (req, res) {
  console.log(result);
  var html = compil(result);
  console.log(html);
  res.render('plan', result);
});
app.post('/submit', function (req, res) {
    var investment = req.body.investment;
    var why = req.body.why;
    var what = req.body.what;

    result = JSON.parse(db.JSON());
    
    result[investment]["why"] = why;
    result[investment]["what"] = what;
    
    db.JSON(JSON.stringify(result));
    db.sync();
    console.log(result)
    res.sendFile(__dirname + '/views/ok.html');
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
  return;
});


// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
