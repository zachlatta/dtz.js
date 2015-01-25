$(document).ready(function(){
debugger;
   $('ul.cards').children('li').each(function(){
        debugger;
        id = 1;
        top = id * 40 +'px;
       $('ul li:nth-child(' + id + ')').css({'top': top, 'z-index': id, 'trandsition-duration': '3s'});
       id += 1
   });
});