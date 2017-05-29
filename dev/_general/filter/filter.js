$(document).ready(function() { 
    $(".commodity_filter").click(function() {
        $(this).find(".options").toggleClass("display_init");
        event.stopPropagation();
        //$(".commodity_filter>.options").toggleClass("display_init");
    });

    $(".options>span").on("click",function(e) {
        event.stopPropagation();
        $(this).parent().prev().text($(this).text());
        $(this).parent().toggleClass("display_init");
        // $(".commodity_filter>span").text($(this).text());
        // $(".commodity_filter>.options").toggleClass("display_init");
    });

    $(document).click(function() {
        var option =  $('.commodity_filter .options');
        if(option.hasClass('display_init')){
            option.removeClass('display_init');
        }
    });
    
});

