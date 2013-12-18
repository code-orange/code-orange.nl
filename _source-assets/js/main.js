var map;
var scrollTrack = new ScrollTracker();

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
	
	$("#home").data('posy', -scrollTop/2);
	
	$("#home").css({
		backgroundPosition: $("#home").data('posx') + " " + $("#home").data('posy') + "px"
	});
}

function navbarSync(){
	scrollTrack.scroll(function(old, current){
		$("#home > nav li").removeClass("active");
		$("#home > nav li#nav_" + current).addClass("active");
		
		var ga_data = {
			page: $("#" + current + "").data('scroll-url'),
			title: $("#" + current + "").data('scroll-title')
		};
		
		ga('send', 'pageview', ga_data);
	});
}

function setupSizes(){
	$("#home > nav > ul > li").css("margin-left", ($("#home > nav").width() - $("#home > nav > img").width() - $("#home > nav > ul").width())
																																	* 0.6
																																	/$("#home > nav > ul > li").size());
	$("#home > nav > ul > li:first-child").css("margin-left", 0);

	$("#home > header").height($(window).height());
	
	setupTeamHexagons();
	
	$("#home > section#contact #map").height(Math.max(500, $(window).height() - $("#footer").outerHeight(true) + 1));
	
	$("#home > section#contact > #contactform").height($("#home > section#contact > #contactform").width() * 1.1429);
	$("#home > section#contact > #contactform").css("margin-top", ($("#home > section#contact > #map").height() - $("#home > section#contact > #contactform").height())/2);
	var hext_leftover = ($("#home > section#contact > #contactform").height() - ($("#home > section#contact > #contactform > hr").eq(0).outerHeight(true) + $("#home > section#contact > #contactform > h1").outerHeight(true) + $("#home > section#contact > #contactform > form").outerHeight(true) + $("#home > section#contact > #contactform > hr").eq(1).outerHeight(true)));
	$("#home > section#contact > #contactform > form").css({
		marginBottom: hext_leftover
	});
	
	setNavbarHeight();
	
	$("#home > section#about > section#about-text > header").height(0.369 * $("#home > section#about > section#about-text > header").width());
	
	scrollTrack.init(window);
}

function setupTeamHexagons(){
	/* Hexagons: 
	 * Ratio height/width: 1.158
	 * 0.6 of height is height, 0.4 is padding-top
	 */
	$("#home > section#about .hexagon").each(function(){
		var hex_height = $(this).width() * 1.158;
		$(this).css({
			height: hex_height * 0.6,
			paddingTop: hex_height * 0.4
		});
		
		var desired_space = (hex_height - ($(this).find(".name").height() + $(this).find(".title").height()))/2;
		var correction = desired_space - (hex_height * 0.4);
		
		$(this).find(".name").css("margin-top", correction);
	});
}

function hexagonContract(hexagon) {
	var hexagon_mid = hexagon.find(".hexagon-mid");
	var hexagon_upper = hexagon.find(".hexagon-upper");
	var hexagon_lower = hexagon.find(".hexagon-lower");
	
	var services_pos = $("#services").offset();
	var parent_dom = hexagon.parent();
	var current_pos = parent_dom.offset();
	
	parent_dom.css("z-index", 4);
	
	$("#overlay-content").fadeOut();
	$(".services-overlay").fadeOut();
	
	hexagon.animate({
		marginTop: "0px",
		marginLeft: "0px",
		opacity: 0.3
	},{ duration: 200, queue: false });
	
	hexagon_mid.animate({
		width: "170px",
		height: "60px"
	},{ duration: 200, queue: false });
	
	hexagon_upper.animate({	
		borderBottomWidth: "50px",
		borderLeftWidth: "85px",
		borderRightWidth: "85px"
	},{ duration: 200, queue: false });
	
	hexagon_lower.css({
		borderTopWidth: "50px",
		borderLeftWidth: "85px",
		borderRightWidth: "85px"
	},{ duration: 200, queue: false });
	
	var left = "0";
	var marginLeft = "0px";
	if(parent_dom.hasClass("hexagon-first")) {
		left = "20%";
	}
	if(parent_dom.hasClass("hexagon-second")) {
		left = "50%";
		marginLeft = "-85px";
	}
	if(parent_dom.hasClass("hexagon-third")) {
		left = "80%";
		marginLeft = "-170px";
	}
	
	parent_dom.animate({
		left:left,
		marginLeft:marginLeft
	},{ duration: 200, queue: true });
}

//expands hexagon and content
function hexagonExpand(hexagon) {
	var hexagon_mid = hexagon.find(".hexagon-mid");
	var hexagon_upper = hexagon.find(".hexagon-upper");
	var hexagon_lower = hexagon.find(".hexagon-lower");
	
	var services_pos = $("#services").offset();
	var parent_dom = hexagon.parent();
	var current_pos = parent_dom.offset();
	
	console.log(services_pos);
	console.log(current_pos);
	
	var height = $("#services > #hexagons").height()
	var width = $("#services > #hexagons").width()
	
	parent_dom.css("z-index", 6);
	
	hexagon.animate({
		marginTop: services_pos.top - current_pos.top - 5/6*height + "px",
		marginLeft: "0px",
		opacity:1.0
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
	
	hexagon_lower.css({
		borderTopWidth: 5/6 * height,
		borderLeftWidth: 1/2 * width,
		borderRightWidth: 1/2 * width
	},{ duration: 200, queue: false });
	
	parent_dom.animate({
		left:"0px",
		marginLeft:"0px"
	},{ duration: 200, queue: true });
	
	var overlay = $("<div class='services-overlay'></div>");
	var sh = $("#services").height();
	var sw = $("#services").width();
	overlay.css({
		position: "absolute",
		background: "#ffffff",
		zIndex: 21,
		height: "0px",
		width: "300%",
		//marginTop: $("#services").height()*1.5,
		marginLeft: -1*sw - 300 + "px"
		//width: Math.sqrt(height*height+width*width) + 200 + "px"
	});
	overlay.prependTo($("#services"));
	$("#overlay-content").html(hexagon.find(".hexagon-content").html());
	
	overlay.animate({
		//marginTop: $("#services").height()*0.3*-1 + "px",
		height: "700px"
	}, 500, function() {
			$("#overlay-content").fadeIn({ duration: 200, queue: true });
		}
	);
}

function slideBackground(){
	if($("#home").data('posx') == "100%"){
		$("#home").data('posx', "0%");
	}else{
		$("#home").data('posx', "100%");
	}
	
	$("#home").animate({
		'background-position-x': $("#home").data('posx')
	}, 'slow');
	
	setTimeout(slideBackground, 10000);
}

function initMap(){
	google.maps.visualRefresh = true;

	var center = new google.maps.LatLng(52.372246, 4.933977);
	
	var styles = [
		{
			"stylers": [
				{ "saturation": -100 }
			]
		}
	]

	var mapOptions = {
		zoom: 13,
		center: center,
		styles: styles,
		scrollwheel: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		panControl: false,
		zoomControl: false,
		mapTypeControl: false,
		scaleControl: false,
		streetViewControl: false,
		overviewMapControl: false
	};
	
	map = new google.maps.Map($("#home > section#contact #map")[0], mapOptions);
	var georssLayer = new google.maps.KmlLayer('http://nub.is/assets/res/map.kml?v1', { preserveViewport: true });
	georssLayer.setMap(map);
}

$(function(){
	var tracking = $("nav").data('tracking');

	setupSizes();
	
	$(window).resize(function(){
		setupSizes();
	});
	
	$(window).scroll(function(){
		setNavbarHeight();
		
		if(tracking){
			navbarSync();
		}
	});
	
	$("#logo").click(function(){
		$(window).scrollTo(0, 'slow');
	});
	
	$("#home > nav").localScroll({
		hash: true
	});
	
	$("#home > section#about .hexagon").each(function(){
		if($(this).data('photo')){
			$(this).css('background-image', 'url(/assets/img/team/' + $(this).data('name') + '.jpg)');
		}else{
			$(this).addClass('nophoto');
		}
	});
	setupTeamHexagons();
	
	//services hexagon expand on click
	$(".service-hex").click(function(){
		if($(this).data("expanded")){
			hexagonContract($(this));
			$(this).data("expanded", false);
		}else{
			hexagonExpand($(this));
			$(this).data("expanded", true);
		}
	});
	
	$.getJSON("/assets/res/quotes.json", function(quotes){
		var i = 0;
		
		function setQuote(){
			var quote = quotes[i];
			
			$("#home > section#about #quote img").attr("src", "/assets/img/team/" + quote.photo + ".jpg");
			$("#home > section#about #quote blockquote").html("&ldquo;" + quote.text + "&rdquo;");
			$("#home > section#about #quote figcaption").text(quote.name);
			
			$("#home > section#about #quote #quote-text").css("margin-top" ,($("#home > section#about #quote").height() - $("#home > section#about #quote #quote-text").height())/2);
			
			i = (i+1)%quotes.length;
			setTimeout(setQuote, 10000);
		}
		
		setQuote();
	});
	
	$.getJSON("/assets/res/cases.json", function(cases){
		var i = 0;
		
		$("#home > section#cases #cases-thumbs .cases-thumb").each(function(){
			var _case = cases[i];
			
			$(this).css("background-image", "url(/assets/img/cases/" + _case.cover + ")");
			$(this).find(".description h2").text(_case.name);
			$(this).find(".description p").text(_case.type);
			$(this).click(function(){
				$("#home > section#cases #case-zoom #case-media").empty();
				$("#home > section#cases #case-zoom #case-media").append(jQuery("<ul>"));
				
				for(var j = 0; j < _case.images.length; j++){
					$("#home > section#cases #case-zoom #case-media ul").append(jQuery("<li>").css("background-image", "url(/assets/img/cases/" + _case.images[j] + ")"));
				}
				
				$("#home > section#cases #case-zoom #case-media").unslider({
					fluid: false,
					dots: true,
					speed: 500
				});
			
				$("#home > section#cases #case-zoom #case-description h1").text(_case.name);
				$("#home > section#cases #case-zoom #case-description p").html(_case.description);
			});
			
			for(var j = 0; j < _case.images.length; j++){
				$("#preload").append(jQuery("<img>").attr("src", "/assets/img/cases/" + _case.images[j]));
			}
			
			i++;
		});
	});
	
	$(".company").click(function(){
		var url;
		if($(this).data("url") != undefined){
			url = $(this).data("url");
		}else{
			url = "http://" + $(this).attr('src').split("/").pop().split(".")[0] + ".nl";
		}
		window.open(url);
	});
	
	initMap();
	
	$("form").submit(function(){
		var formdata = {
			naam: $(this).find("[name=naam]").val(),
			email: $(this).find("[name=email]").val(),
			vraag: $(this).find("[name=vraag]").val()
		};
		
		$.ajax({
			type: "POST",
			url: "/services/contact_email.php",
			data: formdata,
			success: function(){
				$("form").find("input").val("");
				$("form").find("textarea").val("Je vraag is ingestuurd");
				
				var ga_data = {
					page: "/contact-thanks/",
					title: "Contact ingezonden"
				};
				
				ga('send', 'pageview', ga_data);
			}
		});
		
		return false;
	});
	
	$("form img").click(function(){
		$("form").submit();
	});
	
	setTimeout(slideBackground, 10000);
	
	//TODO: re-render every time the page resizes?
	$(".g-page").attr("data-width", $("footer > aside").width()).css("margin-bottom", "50px");
	gapi.page.go();
});
