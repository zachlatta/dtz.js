var exec = require('child_process').exec;
var Omegle = require('omegle').Omegle;
var uuid = require('node-uuid');

var db = require('knex')({
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING
});

var om = new Omegle();

om.conversationParams = [];
om.conversationId;
om.lastMsgTime = new Date();
om.start(function (err) {
  if (err) {
    console.log(err);
    return;
  }

  var partnerId = uuid.v4();
  db('conversations')
    .returning('id')
    .insert({platform: 'omegle', partner_id: partnerId})
  .then(function (ids) {
    om.conversationId = ids[0];

    console.log('conversation ' + om.conversationId + ' with user ' + partnerId +
                ' started');
  })
  .error(function (err) {
    console.error('something terrible happened while creating the conversation');
    process.exit(1);
  });
});

om.on('disconnected', function () {
  console.log('conversation disconnected, starting another!');
  om.start();
});

om.on('gotMessage', function (msg) {
//function getMsg(msg) {
  om.lastMsgTime = new Date();
  console.log('them>', msg);
  db('messages').insert({
    conversation: om.conversationId,
    sender: 'them',
    contents: msg
  })
  .catch(function (err) {
    console.log(err);
  });

  var cmd = './run_zork.sh';

  om.conversationParams.push(msg); 
  if (om.conversationParams.length > 1) {
    cmd += ' "' + om.conversationParams.join('" "') + '"';
  }

  exec(cmd, function (err, stdout, stderr) {
    if (err) {
      console.error(err);
      return
    }

    var resp = stdout.trim();

    var sendMsgs = function (lines) {
      var line = lines.pop();
      om.send(line, function (err) {
        console.log('me>', line);
        db('messages').insert({
          conversation: om.conversationId,
          sender: 'me',
          contents: line
        })
        .catch(function (err) {
          console.error(err);
        });

        if (lines.length) {
          sendMsgs(lines);
        }
      });
    };

    sendMsgs(resp.split('\n').reverse());
  });
//}
});

setInterval(function () {
  if (!om.lastMsgTime) {
    return;
  }

  var currentTime = new Date();
  var secondsPassed = (currentTime - om.lastMsgTime) / 1000;
  console.log(secondsPassed);
  if (secondsPassed > 30) {
    console.log('ending conversation');
    om.disconnect(function (err) {
      if (err) {
        console.error(err);
        process.exit(1);
        return;
      }
      process.exit(0);
    });
  }
}, 1000);
