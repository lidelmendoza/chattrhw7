var http = require('http'); // provides a lot of tools working with http requests and responses
var fs = require('fs'); // imports file system module
var extract = require ('./extract');
var wss = require('./websockets-server');


var handleError = function (err, res){
  res.writeHead(404);
  res.end();
};

var server = http.createServer(function (req, res) { //takes in one argument, a function.
  console.log('Responding to a request.');            // this function is called everytime there a a http request
  var filePath = extract(req.url);

  fs.readFile(filePath, function (err, data) { // takes file name and call back
    if(err) {
      handleError(err,res);
      return;
    } else {
      res.end(data); // you send the data as a response
    }
  });
});
server.listen(3000);    //this is where the action is going to take place
                        //fancy term what is known as binding to a port
