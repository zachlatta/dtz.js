var express = require('express');
var app = express();

app.get('/omegle', function(req, res) {
  res.send('yo, omegle');
});

app.get('/tinder', function(req, res) {
  res.send('yo, tinder');
});

app.listen(3000);