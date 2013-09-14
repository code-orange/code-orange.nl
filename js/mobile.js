$(function(){
	$("#home > header").height($(window).height() - $("#home > nav").outerHeight(true) - parseFloat($("#home > header").css("padding-top")));
	
	$.getJSON("/res/cases.json", function(cases){
		var i = 0;
		
		$("#home > section#cases .case-holder").each(function(){
			var _case = cases[i];
			
			$(this).find("img").attr("src", "/img/cases/" + _case.cover);
			$(this).find(".case-description h1").text(_case.name);
			$(this).find(".case-description p").html(_case.description);
			
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
			}
		});
		
		return false;
	});
	
	$("form img").click(function(){
		$("form").submit();
	});
});