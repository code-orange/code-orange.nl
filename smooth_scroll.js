
$(document).ready(function(){
    $("#click").click(function() {
        $('html, body').animate({
            scrollTop: $("#tools").offset().top
        }, 1500);
    });
});
