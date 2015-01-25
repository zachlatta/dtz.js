
$(document).ready(function(){
    $start = $('#start');
    $macbook = $('.md-macbook-pro');
    $iphone = $('.md-iphone-5');

    $macbook.hide();

    $iphone.hide();

    $start.on('click', function(){
        

        $.ajax({
        url:"/conversations",
        type: 'GET',
        dataType: 'json',
        success:function(data){
            data.forEach(function(item) {

                $('#ids').append('<a class="collection-item" data-id="' + item.id + '">' + item.id + '</a>');

                });

            $('#ids a').on('click', function(){
            id = $(this).data('id');
            console.log("CLICKED " + id);

            $.ajax({
                url: "/conversations/" + id,
                type: 'GET',
                dataType: 'json',
                success: function(data) {



                    $iphone_screen = $('.md-screen');
                    console.log("SUCCESS " + data);
                    $('#ids').fadeOut();


                    data.forEach(function(item) {
                        sender = data['sender'];
                        console.log(item.contents);
                        if (sender == 'them') {
                            $iphone_screen.append('<p class="message bot"><br>' + item.contents + '</p>');
                        } else {
                            $iphone_screen.append('<p class="message"><br>' + item.contents + '</p>');
                        }
                    });



                    $macbook.fadeIn();
                    $iphone.fadeIn();
                },
                error : function(error) {
                    console.log("ERROR " + error);
                    console.log(error);
                }
            });
            });

            
            /*
            id = data.id;

            console.log(id);
            console.log(data.platform);
            */


          }});
    });
});