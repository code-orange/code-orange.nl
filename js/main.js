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
	$("#home > nav > ul > li").css("margin-left", ($("#home > nav").width() - $("#home > nav > img").width() - $("#home > nav > ul").width())
																																	* 0.6
																																	/$("#home > nav > ul > li").size());
	$("#home > nav > ul > li:first-child").css("margin-left", 0);

	$("#home > header").height($(window).height());
	
	setupTeamHexagons();
	
	$("#home > section#contact > #contactform").height($("#home > section#contact > #contactform").width());
	
	setNavbarHeight();
}

function setupTeamHexagons(){
	/* Hexagons: 
	 * Ratio height/width: 1.158
	 * 0.6 of height is height, 0.4 is padding-top
	 */
	$("#home > section#about .hexagon").each(function(){
		var hex_height = $(this).width() * 1.158;
		console.log(hex_height);
		$(this).css({
			height: hex_height * 0.6,
			paddingTop: hex_height * 0.4
		});
	});
}

//expands hexagon and content
function hexagonExpand(hexagon) {
	var hexagon_mid = hexagon.find(".hexagon-mid");
	var hexagon_upper = hexagon.find(".hexagon-upper");
	var hexagon_lower = hexagon.find(".hexagon-lower");
	
	var services_pos = $("#services").offset();
	var current_pos = hexagon.parent().offset();
	
	console.log(services_pos);
	console.log(current_pos);
	
	var height = $("#services > #hexagons").height()
	var width = $("#services > #hexagons").width()
	
	hexagon.css("z-index", 20);
	
	hexagon.animate({
		marginTop: services_pos.top - current_pos.top - 5/6*height + "px",
		marginLeft: "0px"
	},{ duration: 200, queue: false });
	
	hexagon_mid.animate({
		height:"500px",
		width:width
	},{ duration: 200, queue: false });
	
	hexagon_upper.animate({
		borderBottomWidth: 5/6 * height,
		borderLeftWidth: 1/2 * width,
		borderRightWidth: 1/2 * width
	},{ duration: 200, queue: false });
	
	hexagon_lower.animate({
		borderTopWidth: 5/6 * height,
		borderLeftWidth: 1/2 * width,
		borderRightWidth: 1/2 * width
	},{ duration: 200, queue: true });
	
	var overlay = $("<div class='services-overlay'></div>");
	overlay.css({
		position: "absolute",
		background: "#ffffff",
		zIndex: 21,
		height: "0px",
		width: "200%",
		marginTop: $("#services").height()*1.5,
		marginLeft: "-250px",
		width: Math.sqrt(height*height+width*width) + 500 + "px"
	});
	overlay.prependTo($("#services"));
	$("#overlay-content").html(hexagon.find(".hexagon-content").text());
	
	overlay.animate({
		marginTop: $("#services").height()*0.3*-1 + "px",
		height: "150%"
	}, 500, function() {
			$("#overlay-content").fadeIn({ duration: 200, queue: true });
		}
	);
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
		if($(this).data('photo')){
			$(this).css('background-image', 'url(/img/team/' + $(this).data('name') + '.jpg)');
		}else{
			$(this).addClass('nophoto');
		}
	});
	setupTeamHexagons();
	
	//services hexagon expand on click
	$("#hex-social").click(function(){
		hexagonExpand($(this));
	});
	
	$.getJSON("/res/quotes.json", function(quotes){
		var i = 0;
		
		function setQuote(){
			var quote = quotes[i];
			
			$("#home > section#about #quote img").attr("src", "/img/team/" + quote.photo + ".jpg");
			$("#home > section#about #quote blockquote").html("&ldquo;" + quote.text + "&rdquo;");
			$("#home > section#about #quote figcaption").text(quote.name);
			
			$("#home > section#about #quote #quote-text").css("margin-top" ,($("#home > section#about #quote").height() - $("#home > section#about #quote #quote-text").height())/2);
			
			i = (i+1)%quotes.length;
			setTimeout(setQuote, 10000);
		}
		
		setQuote();
	});
});
