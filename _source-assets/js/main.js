$(function(){
	'use strict';

	//Move grey paragraph below cover photo
	(function(){
		var currentTop = $("#cover > h3").first().offset().top;
		var shouldTop = (800/1440) * screen.width;
		if(shouldTop > currentTop){
			$("#cover > h3").first().css("margin-top", shouldTop - currentTop);
		}
	}());
	
	$(".company").click(function(){
		var url;
		if($(this).data("url") != undefined){
			url = $(this).data("url");
		}else{
			url = "http://" + $(this).attr('src').split("/").pop().split(".")[0] + ".nl";
		}
		window.open(url);
	});
	
	$("form").submit(function(){
		var formdata = {
			naam: $(this).find("[name=naam]").val(),
			email: $(this).find("[name=email]").val(),
			vraag: $(this).find("[name=bericht]").val()
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
	
	$("#drop-down").on('click', function(){
		$("#mega-menu").slideDown('fast', function(){
			$("#close").css("top", (-1 * $(".menuitem").first().offset().top) + 5);
		});
	});
	
	$("#menuCloseButton").on('click', function(){
		$("#mega-menu").slideUp('fast');
	});
	
	$("#mega-menu li a").on('click', function(){
		var href = $(this).attr('href');
		if(href.charAt(0) == "#"){
			$("#mega-menu").slideUp('fast');
			$.scrollTo($(href), 800);
			return false;
		}
	});
	


	function redraw_managers_section(){

	//Import the size of the image and the size of the section
	var img = { width: $("section#community-managers").data('imgWidth'),
				height: $("section#community-managers").data('imgHeight') };

	var section = {  inner_width: parseFloat($("section#community-managers").css('width')),
					inner_height: parseFloat($("section#community-managers").css('height')),
					       pad_x: parseFloat($("section#community-managers").css('padding-left')),					
						   pad_y: parseFloat($("section#community-managers").css('padding-top')) };

	//compute and store the real width of the section
	section.width  = section.inner_width  + 2 * section.pad_x;
	section.height = section.inner_height + 2 * section.pad_y;

	console.log(section)

	//calculate the behaviour of the background which is set to cover mode
	if ( section.width/section.height < img.width/img.height ){
		//scale vertical
		var scale = section.height/img.height;
		//crop horizontal
		var crop = {x: (scale * img.width - section.width), y:0};
	}else{
		console.log('scale horizontal')
		//scale horizontal
		var scale = section.width/img.width;
		//crop vertical
		var crop = {x:0, y: (scale * img.height - section.height) };
	}

	//convert crop in px to a marginal crop
	crop.x = img.width / (img.width-crop.x);
	crop.y = img.height / (img.height-crop.y);
	
	//pass calculations to redraw circles
	redraw_circles(section,crop);

	}



	//initialise:

	//get background image size and store
	var img = new Image;
	img.src = $("section#community-managers").css('background-image').match(/url\(([^)]+)\)/i)[1];
	img.onload =function(){
		//store bg image size
		$("section#community-managers").data('imgWidth',this.width);
		$("section#community-managers").data('imgHeight',this.height);
		redraw_managers_section();

	};
	



	function redraw_circle(circle_id,section,crop){

		$(circle_id).show();

		console.log(crop)

		//import circle specs
		var circle = { width : parseFloat($(circle_id).css('width')),
					   height: parseFloat($(circle_id).css('height')),  
					        x: parseFloat($(circle_id).data('posx')),
					        y: parseFloat($(circle_id).data('posy')) };

		//convert coordinates from the full image to cropped image (the section)
		circle.x = circle.x * crop.x;
		circle.y = circle.y * crop.y;

		/*NOTE: AFTER THIS CALCULATION YOU CAN CHECK WHETER THE COORDINATE 
		FALLS WITHIN THE IMAGE OR NOT.
		if circle.x or circle.y >1 the center of the circle will be outsite the image.
		*/
		console.log(circle);
		//convert coordinates from our scale of [100,-100] to actual pixels in x,y from the center
		circle.x = circle.x/100 * section.width/2;
		circle.y = circle.y/100 * section.height/2;

		//correct for the image centre
		circle.left = circle.x + section.width/2;
		circle.top  = circle.y + section.height/2;
		
		//correct for the position of the containing div (.circles)
		//circle.top  = circle.top  - section.pad_y;
		circle.left = circle.left - section.pad_x;


		//center the circle around its coordinates
		circle.top  = circle.top  - circle.width/2;
		circle.left = circle.left - circle.height/2;

		$(circle_id).css({'top': circle.top,'left': circle.left});

		



		/*TODO:
			- Scrollen
			- Menu icon met animatie veranderen in kruisje
			- Prijzen mobiel
			- Contact: formulier links +wat nubis nog meer doet, adres gegevens rechts (niet bij mobile)





		*/


		//console.log($("section#community-managers").css('padding-left'));
		/*
		var c_width = parseFloat($(circle_id).css('width'));
		var c_height = parseFloat($(circle_id).css('height'));

		$(circle_id).show();

		var c_x = parseFloat($(circle_id).data('posy'));
		var c_y = parseFloat($(circle_id).data('posx'));

		var im_center_x = (parseFloat($(".circles").css('width') ) - parseFloat($(circle_id).css('width' )) )/2 ;
		var im_center_y = (parseFloat($(".circles").css('height')) - parseFloat($(circle_id).css('height')) )/2 ;

		var im_width  = parseFloat($("section#community-managers").css('padding-left')) + parseFloat($(".circles").css('width') )/2;
		var im_height = parseFloat($("section#community-managers").css('padding-top')) + parseFloat($(".circles").css('height') )/2;


		var left = im_center_x + c_x/100 * im_width;
		var top  = im_center_y + c_y/100 * im_height;



		$(circle_id).css({'top': top,'left': left});

		*/
		
	};



	$( window ).resize(redraw_managers_section);

	//$(".employee_circle").show();

	function redraw_circles(section,crop){
		$(".employee_circle").each(function(index){
			redraw_circle('#' + $(this).attr('id'),section,crop);
		});
	};

	if(screen.width > 1900 && screen.width < 1940){

		/*$(".employee_circle").show();

		
		$(".hexagon").on('mouseenter', function(){
			$(".employee_circle").hide();
			$("#circle_" + $(this).data('name')).fadeIn('fast');
		});

		$(".hexagon").on('mouseleave', function(){
			$("#circle_" + $(this).data('name')).fadeOut('fast');
		});*/
	}
});
