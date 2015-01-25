var exec = require('child_process').exec;
var Omegle = require('omegle').Omegle;

var om = new Omegle();

var conversationParams = [];
om.start(function (err) {
  if (err) {
    console.log(err);
  }

  console.log('conversation started');
});

om.on('disconnected', function () {
  console.log('conversation disconnected, starting another!');
  om.start();
});

om.on('gotMessage', function (msg) {
  console.log('msg received:', msg);

  var cmd = './run_zork.sh';

  if (conversationParams.length > 0) {
    conversationParams.push(msg); 
    cmd += ' "' + conversationParams.join('" "') + '"';
  }

  exec(cmd, function (err, stdout, stderr) {
    if (err) {
      console.error(err);
      return
    }

    om.startTyping(function (err) {
      console.log('sent start typing');

      setTimeout(function () {
        om.stopTyping(function (err) {
          console.log('sent stop typing');

          om.send(stdout, function (err) {
            console.log('sent', stdout);
          });
        });
      }, 3000);
    });
  });
});
