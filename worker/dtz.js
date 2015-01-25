var secrets = require("./secrets");
var tinder = require('tinderjs');
var _ = require('underscore')
var bot = new tinder.TinderClient();

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
