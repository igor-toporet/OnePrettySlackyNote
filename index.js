var express = require('express');
var app = express();
var reequest = require('request');
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.post('/', function(request, response) {
  if(request.body['command'] == "/onenoteurl"){
      var url = request.body['text'];
      var name = "Link (Webview)";
      var responseUrl = request.body['response_url'];
      var returnVal = {
    "response_type": "in_channel",
    "text": "A OneNote link to page was pasted",
    "attachments": [
        {
                       "title": name,
            "title_link": url
        }
    ]
};


reequest(responseUrl, function(error, response, body) {
  response.send(returnVal);
});


      //response.send(returnVal);
  }
  else {
      response.send("fail");
  }
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


