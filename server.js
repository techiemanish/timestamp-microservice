// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", function(req, res){
  let input = req.params.date;
  let d = new Date(input);
  
  //this condition will check blank api call
  if(input == undefined){
    let d = new Date();
    res.json({
    unix : Date.parse(d),
    utc : d.toUTCString()
    })
  }
  //this condition will check strictly date format in (dd-mm-yyyy)
  else if((/\-/).test(input) && (d.toUTCString() != "Invalid Date")){
    let d = new Date(input);
    res.json({
    unix : Date.parse(input),
    utc : d.toUTCString()
    })
  }
  
  //this condition will check for number and parse string to number
  else if(/^-?[\d.]+(?:e-?\d+)?$/.test(input)){
    let d = new Date(parseInt(input));
    res.json({
    unix : Date.parse(d),
    utc : d.toUTCString()
    })
  }
  
  else if(parseInt(input.toString()).toString() == "NaN"){
    res.json({
      error : "Invalid Date"
    })
  }
  else if(typeof d == "object"){
    res.json({
    unix : Date.parse(d),
    utc : d.toUTCString()
    })
  }
  else{
    res.json({
      error : "Invalid Date"
    })
  }
 
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


