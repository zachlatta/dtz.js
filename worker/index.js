var Q = require('q');
var Queue = require('bull');
var Omegle = require('omegle').Omegle;

var msgQueue = Queue('msg', 6379, '127.0.0.1');
var om = new Omegle();

msgQueue.process(function (job, done) {
  console.log(job.data);
  done();
});

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

  om.startTyping(function (err) {
    console.log('sent start typing');

    setTimeout(function () {
      om.stopTyping(function (err) {
        console.log('sent stop typing');

        om.send('hey!', function (err) {
          console.log('sent hey');
        });
      });
    }, 3000);
  });
});
