$(function(){
	if( isPC () ) return ;
	else {

		$('.mobile-toggle').click(function(){

				$('.search-widget').show();	

				if( $(this).hasClass('icon-menu')){
					slideMenu( $(this));						
				}else if($(this).hasClass('icon-no-menu')){
					hideMenu( $(this) );				
				}
		})


		$('.mobile-menu-search').click(function(){	
				hideMenu($('.mobile-toggle'));	
		})
	}
});


function slideMenu( $icon ){

	$icon.removeClass('icon-menu').addClass('icon-no-menu');
	
	$('.mobile-menu').show().removeClass('menuSlideOut').addClass('menuSlideIn');

	$('.header')
	.removeClass('slide-left')
	.addClass('slide-right');

	$('.container')
	.removeClass('slide-left')
	.addClass('slide-right');

}



function hideMenu( $icon ){

	$icon.removeClass('icon-no-menu').addClass('icon-menu');

	$('.mobile-menu').removeClass('menuSlideIn').addClass('menuSlideOut');
	

	$('.header')
	.removeClass('slide-right')
	.addClass('slide-left');
	$('.container')
	.removeClass('slide-right')
	.addClass('slide-left');
}
