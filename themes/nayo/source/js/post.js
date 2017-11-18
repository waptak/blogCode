var logo;
var logoTitle;

//post页面标题跟踪
$(function(){

	if(isPC()){//移动端不使用

	  //初始化
	 logo = $('.header-logo');
	 logoTitle =  $('.header-logo').text();


	$(window).scroll(function() {

		var $header =$('.header');
		//下滑了header则修改logo
		if($header.hasClass('slideDown')){				
			setTitle();
		}else if($(window).scrollTop() == 0){
			//还原logo
			setLogo();
		}
	})

	}
})

//把logo设置成标题
function setTitle(){

	//获取post标题
	var postTitle = $('.post-title').text();

	postTitle = cutString(postTitle , 38);

	$('.header-logo').text(postTitle);		
	
}
//还原logo
function setLogo(){
	
	$('.header-logo').text(logoTitle);	

}
//---------------
// reward
$(function(){

	$('.reward-icon').click(function(){

		if($(this).hasClass('icon-reward')){
			$(this).removeClass('icon-reward').addClass('icon-noreward');
			showReward();

		}else if($(this).hasClass('icon-noreward')) {
			$(this).removeClass('icon-noreward').addClass('icon-reward');
			hideReward();
		}

		
	});
})

function showReward(){
	
	$('.reward-img-left').addClass('slideLIn').show();
	$('.reward-img-right').addClass('slideRIn').show();
}
function hideReward(){
	
	$('.reward-img-left').removeClass('slideLIn').hide();
	$('.reward-img-right').removeClass('slideRIn').hide();

}