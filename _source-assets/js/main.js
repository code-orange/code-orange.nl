$(function(){
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
});
