
$(document).ready(function(){
    $start = $('#random');
    $macbook = $('.md-macbook-pro');
    $iphone = $('.md-iphone-5');
    $search = $('#search');
    $device_screen = $('.md-screen');
    $macbook.hide();
    $iphone.hide();


$start.on('click', function(){
    $(this).fadeOut();

});

function get_entry(id) {
    $.ajax({
    url: "/conversations/" + id,
    type: 'GET',
    dataType: 'json',
    success: function(data) {
        
        data.forEach(function(item) {
            sender = item['sender'];
            console.log(item.contents);
            if ((sender == 'me') && (item.contents.length > 0)) {
                $device_screen.append('<p class="message bot"><br>' + item.contents + '</p>');
            } else {
                $device_screen.append('<p class="message"><br>' + item.contents + '</p>');
            }

        });



        if (data.platform == "omegle"){
            $iphone.fadeIn();
            $start.fadeOut();
        } else {
            $macbook.fadeIn();
            $start.fadeOut();
        }
    },
    error : function(error) {
        console.log("ERROR " + error);
        console.log(error);
    }
});
}

$start.on('click', function(){
    $.ajax({
        url: "/conversations/",
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            var index = Math.floor(Math.random()*data.length);
            var entry = data[index];
            console.log(entry);
            get_entry(entry.id);
        }
    });
});




    $search.on('input', function(){
        q = $(this).val();
        if (q == '') {
            $macbook.hide();
            $iphone.hide();
            return false;
        }
        console.log(q);

        get_entry(q);
    });
});