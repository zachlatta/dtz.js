
$(document).ready(function(){
    $start = $('#start');
    $macbook = $('.md-macbook-pro');
    $iphone = $('.md-iphone-5');

    $macbook.hide();

    $iphone.hide();

    $start.on('click', function(){
        $macbook.show();
        $iphone.show();

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
            console.log("CLICKED " +    id);
            $.ajax({
                url: "/conversations/" + id,
                type: 'GET',
                dataType: 'json',
                success: function(data) {
                    console.log("SUCCESS " + data);
                    debugger;
                    data.forEach(function(item) {
                        console.log(item);
                    });
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