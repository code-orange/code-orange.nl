function setNavbarHeight(){
	var scrollTop = $(window).scrollTop();

	var nav_baseheight = 0.19 * $(window).height();
	
	//Navbar size
	var navheight, padsize, actual_height;
	
	navheight = Math.max(nav_baseheight - scrollTop, 65);
	padsize = navheight * 0.15;
	actual_height = navheight - 2*padsize;

	$("#home > nav").css({
		height: actual_height,
		paddingTop: padsize,
		paddingBottom: padsize
	});
	
	$("#home > nav > ul").css({
		marginTop: (actual_height-$("#home > nav > ul").height())/2
	});
	
	$("#home").css({
		backgroundPosition: "0 " + -scrollTop/2 + "px"
	});
}

function navbarSync(){
	var scrollTop = $(window).scrollTop();

	//Content activate
	var services_top, cases_top, about_top, contact_top;
	services_top = $("#services").offset().top - 1;
	cases_top = $("#cases").offset().top - 1;
	about_top = $("#about").offset().top - 1;
	blog_top = $("#blog").offset().top - 1;
	contact_top = $("#contact").offset().top - 1;
	
	$("#home > nav li").removeClass("active");
	
	if(scrollTop >= services_top && scrollTop < cases_top){
		$("#home > nav li#nav_services").addClass("active");
	}else if(scrollTop >= cases_top && scrollTop < about_top){
		$("#home > nav li#nav_cases").addClass("active");
	}else if(scrollTop >= about_top && scrollTop < blog_top){
		$("#home > nav li#nav_about").addClass("active");
	}else if(scrollTop >= blog_top && scrollTop < contact_top){
		$("#home > nav li#nav_blog").addClass("active");
	}else if(scrollTop >= contact_top){
		$("#home > nav li#nav_contact").addClass("active");
	}
}

function setupSizes(){
	$("#home > nav > ul > li").css("margin-left", ($("#home > nav").width() - $("#home > nav > img").width() - $("#home > nav > ul").width())/$("#home > nav > ul > li").size());
	$("#home > nav > ul > li:first-child").css("margin-left", 0);

	$("#home > header").height($(window).height());
	
	$("#home > section#contact > #contactform").height($("#home > section#contact > #contactform").width());
	
	setNavbarHeight();
}

$(function(){
	setupSizes();
	
	$(window).resize(function(){
		setupSizes();
	});
	
	$(window).scroll(function(){
		setNavbarHeight();
		
		navbarSync();
	});
	
	$("#logo").click(function(){
		$(window).scrollTo(0, 'slow');
	});
	
	$("#home > nav").localScroll({
		hash: true
	});
	
	$("#home > section#about .hexagon").each(function(){
		$(this).css('background-image', 'url(/img/team/' + $(this).data('name') + '.jpg)');
	});
	
	$.getJSON("/res/quotes.json", function(quotes){
		var i = 0;
		
		function setQuote(){
			var quote = quotes[i];
			
			$("#home > section#about #quote img").attr("src", "/img/team/" + quote.photo + ".jpg");
			$("#home > section#about #quote blockquote").html("&ldquo;" + quote.text + "&rdquo;");
			$("#home > section#about #quote figcaption").text(quote.name);
			
			i = (i+1)%quotes.length;
			setTimeout(setQuote, 10000);
		}
		
		setQuote();
	});
});
