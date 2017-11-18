// init fancybox
$(function(){
        $('img').each(function() {      
        $(this).attr({
        'data-fancybox' : 'group',
        'data-type'     : 'image',
        'data-src'      : $(this).attr('src') 
        });  
  });        
});
// 记1个坑 (fancybox3) 