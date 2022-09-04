// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date?", (req, res) => {
  const theval = req.params.date;
  const isStr = isNaN(Number(req.params.date))
  console.log(`is string? ${isStr}, typeof: ${typeof parseInt(req.params.date)}, value is: ${req.params.date}`);
  const dateNumVal = Number(req.params.date); 
  if (theval && !isStr) {
    var unixSec = new Date(dateNumVal).getTime();
    var dateGMT = new Date(dateNumVal).toGMTString();
  } else if (theval && isStr) {
    var unixSec = new Date(req.params.date).getTime();
    var dateGMT = new Date(req.params.date).toGMTString();
  } else if (!theval) {
    var unixSec = new Date().getTime();
    var dateGMT = new Date().toGMTString();
  }
  if (dateGMT == "Invalid Date") res.json({ "error": dateGMT })
  else {
    res.json({ "unix": unixSec, "utc": dateGMT })
  }
})

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
