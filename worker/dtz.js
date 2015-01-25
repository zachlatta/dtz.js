var secrets = require("./secrets");
var tinder = require('tinderjs');
var _ = require('underscore')
var bot = new tinder.TinderClient();

var db = require('knex')({
    client: 'pg',
      connection: process.env.PG_CONNECTION_STRING
});

bot.authorize(
  secrets.token,
  secrets.user,

  function() {

    var defaults = bot.getDefaults()
    var recs_size = defaults.globals.recs_size;
    bot.getRecommendations(recs_size, function(error, data){
      _.chain(data.results)
        .pluck('_id')
        .each(function(id) {
          bot.like(id, function(error, data) {
            console.log("liked: " + id);
          });
        });
    });
    // setInterval(function () {
    //   bot.getUpdates(function (err, updates) {
    //     _.each(updates.matches, function (match) {
    //       //{ _id: '54c5222f487f377160d1cfd3',
    //           //match_id: '54bebeb5d6035bca31b705f354c48e4f498bfaab7f328cba',
    //             //to: '54c48e4f498bfaab7f328cba',
    //               //from: '54bebeb5d6035bca31b705f3',
    //                 //message: 'I swiped right so fast almost broke my phone ...',
    //                   //sent_date: '2015-01-25T17:04:47.083Z',
    //                     //created_date: '2015-01-25T17:04:47.083Z',
    //                       //timestamp: 1422205487083 }
    //       _.each(match.messages, function (msg) {
    //         console.log(msg);
    //         db.select('id').from('conversations').where({partner_id: msg.match_id})
    //         .then(function (ids, otherParams) {
    //           if (ids.length) {
    //             console.log('create new');
    //             return db('messages').insert({
    //               conversation: ids[0],
    //               sender: 'them',
    //               contents: msg.message
    //             });
    //           } else {
    //             return db('conversations')
    //               .returning('id')
    //               .insert({
    //                 platform: 'tinder',
    //                 partner_id: msg.match_id
    //               })
    //               .then(function (convIds) {
    //                 return db('messages').insert({
    //                   conversation: convIds[0],
    //                   sender: 'them',
    //                   contents: msg.message
    //                 });
    //               });
    //           }
    //         })
    //         .catch(function (err) {
    //           console.error(err);
    //         });
    //       });
    //     });
    //   });
    // }, 1000); 

    // bot.getHistory(function(error, data) {
    //   _.chain(data.matches)
    //     .pluck('_id')
    //     .each(function(id) {
    //       bot.sendMessage(id, "hey, how's it going?", function(error, data) {
    //         console.log('yo ' + data);
    //       })
    //     });
    // });
  });
