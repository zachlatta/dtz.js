var express = require('express');
var app = express();
app.set('views', __dirname);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));
var _ = require('underscore');
var knex = require('knex')({
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING
});


app.get('/', function( req, res ) {
  res.render('index');
});
app.get('/conversations/:chat_id', function(req, res) {
  var omegle = knex('messages')
    .where('conversation', req.params.chat_id)
    .select('id', 'sender', 'contents')
    .then(function (rows) {
    res.send(rows);
  });
});

app.get('/conversations', function(req, res) {
  knex('conversations').then(function (conversations) {
    res.send(conversations);
  });
});

app.listen(process.env.PORT || 3000);
