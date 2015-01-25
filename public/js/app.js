
$(document).ready(function(){
    $start = $('#start');
    $macbook = $('md-macbook-pro');
    $iphone = $('md-iphone-5');

    $macbook.hide();

    $iphone.hide();

    $start.on('click', function(){
        $macbook.show();
        $iphone.show();

        $.ajax({
        url:"/omegle",
        type: 'GET',
        dataType: 'json',
        success:function(data){
            id = data.id;

            console.log(id);
            console.log(data.platform);



          }});
    });
});