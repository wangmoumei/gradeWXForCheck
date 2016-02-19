var tab = new fz.Scroll('#tab', {
	role: 'tab',
	autoplay: false,
	interval: 3000
});
//$('#tab').height(document.documentElement.clientHeight - 45);
/*$('.ui-tab-content li div').height(document.documentElement.clientHeight - 90);
new fz.Scroll('#gradeList div', {
	scrollY: true
});
new fz.Scroll('#topList div', {
	scrollY: true
});*/
var selectScroller = null;
$('#selectBox').on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){
	if($(this).hasClass('fadeIn')){
		var scroller = $('#selectScroller');
		if(scroller.find('.select-list').get(0).clientHeight>=250) {
			scroller.height(250);
			if(selectScroller)
				selectScroller.refresh();
			else 
				selectScroller = new fz.Scroll('#selectScroller', {
					scrollY: true
				});	
		}
		else{
			scroller.height(scroller.find('.select-list').get(0).clientHeight);
			selectScroller = new fz.Scroll('#selectScroller', {
				scrollY: true
			});	
		}
	}
})
$('#selectWeek').click(function(){
	$('#selectBox').removeClass('hide fadeOut').addClass('show fadeIn');
});
$('#selectBoxClose').click(function(){
	$('#selectBox').removeClass('show fadeIn').addClass('fadeOut');
})
$('.my-notice').height(document.documentElement.clientHeight - 180);