
$(document).ready(function(){
    $start = $('#start');
    $macbook = $('md-macbook-pro');
    $iphone = $('md-iphone-5');

    $macbook.hide();

    $iphone.hide();

    $start.on('click', function(){
        $macbook.show();
        $iphone.show();
    });

$start.click(function(){
  $.ajax({
        url:"/omegle",
        type: 'GET',
        dataType: 'html',
        success:function(data){
            debugger;
            console.log(data);
  }});
});

});