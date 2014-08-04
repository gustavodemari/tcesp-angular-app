var config = require('./configs/config.js');
var express = require('express');

var app = express();

app.use(express.static(__dirname + '/app'));

app.listen(config.server.PORT, function(){
  console.log('Front-end server running at '+config.server.PORT);
});
