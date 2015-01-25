$(document).ready(function(){
   function animate_rooms() {
        $('#games').children('tr').each(function(){
            $(this).addClass('active');
        });
   }

   setTimeout(animate_rooms, 1000);
});