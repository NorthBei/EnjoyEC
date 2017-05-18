$(document).ready(function() { 
    $(".commodity_filter").click(function() {
        $(this).find(".options").toggleClass("display_init");
        //$(".commodity_filter>.options").toggleClass("display_init");
    });

    $(".options>span").on("click",function(e) {
        event.stopPropagation()
        $(this).parent().prev().text($(this).text());
        $(this).parent().toggleClass("display_init");
        // $(".commodity_filter>span").text($(this).text());
        // $(".commodity_filter>.options").toggleClass("display_init");
    });
    
});