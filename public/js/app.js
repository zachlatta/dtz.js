
$(document).ready(function(){
    $start = $('#start');
    $macbook = $('.md-macbook-pro');
    $iphone = $('.md-iphone-5');
    $search = $('#search');
    $macbook.hide();

    $iphone.hide();

    $search.on('input', function(){
        q = $(this).val();
        if (q == '') {
            $macbook.hide();
            $iphone.hide();
            return false;
        }
        console.log(q);

        $.ajax({
            url: "/conversations/" + q,
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                $device_screen = $('.md-screen');
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
                } else {
                    $macbook.fadeIn();
                }
            },
            error : function(error) {
                console.log("ERROR " + error);
                console.log(error);
            }
        });
    });
});