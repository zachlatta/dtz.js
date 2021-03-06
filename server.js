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
  knex.raw('SELECT c.* \
FROM conversations as c \
WHERE EXISTS \
( SELECT * \
  FROM messages as m \
  WHERE m.conversation=c.id \
)').then(function (data) {
    res.send(data.rows);
  });
});

app.listen(process.env.PORT || 3000);
