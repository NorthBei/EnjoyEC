$(document).ready(function() { 
    $(".commodity_filter").click(function() {
        $(".commodity_filter>.options").toggleClass("display_init");
    });

    $(".options>span").on("click",function(e) {
        event.stopPropagation()
        $(".commodity_filter>span").text($(this).text());
        $(".commodity_filter>.options").toggleClass("display_init");
    });
    
});