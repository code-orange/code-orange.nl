$(function(){
	$("#home > header").height($(window).height());
	
	var nav_baseheight = 185;
	$(window).scroll(function(){
		var scrollTop = $(window).scrollTop();
	
		//Navbar size
		var navheight, padsize;
		
		navheight = Math.max(nav_baseheight - scrollTop, 65);
		padsize = navheight * 0.15;

		$("#home > nav").css({
			height: navheight - 2*padsize,
			paddingTop: padsize,
			paddingBottom: padsize
		});
		
		//Content activate
		var services_top, cases_top, about_top, contact_top;
		services_top = $("#services").offset().top - 1;
		cases_top = $("#cases").offset().top - 1;
		about_top = $("#about").offset().top - 1;
		contact_top = $("#contact").offset().top - 1;
		
		$("#home > nav li").removeClass("active");
		
		if(scrollTop >= services_top && scrollTop < cases_top){
			$("#home > nav li#nav_services").addClass("active");
		}else if(scrollTop >= cases_top && scrollTop < about_top){
			$("#home > nav li#nav_cases").addClass("active");
		}else if(scrollTop >= about_top && scrollTop < contact_top){
			$("#home > nav li#nav_about").addClass("active");
		}else if(scrollTop >= contact_top){
			$("#home > nav li#nav_contact").addClass("active");
		}
	});
	
	$("#logo").click(function(){
		$(window).scrollTo(0, 'slow');
	});
	
	$("#home > nav").localScroll({
		hash: true
	});
});
