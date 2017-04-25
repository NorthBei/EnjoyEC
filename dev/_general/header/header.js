$(document).ready(function() {
    var navHeight = $("#header").height();
    var isCrossHeader = false;
    
    $(document).on("scroll",function(){
        
        var topHeight = document.documentElement.scrollTop||document.body.scrollTop;
        // console.log("topHeight1:"+topHeight);
        // console.log("navHeight:"+navHeight);
        var width = window.innerWidth;
        
        if(topHeight>= navHeight && isCrossHeader == false && width >= 850){
            isCrossHeader = true;
            $("#header").addClass("scroll_header");
        }
        else if(topHeight< navHeight && isCrossHeader == true){
            isCrossHeader = false;
            $("#header").removeClass("scroll_header");
        }
        
    });

    $(".more_option>.child_category_list>li").hover(function(){
        var li = $(this);
        $(".more_option .first_layer_triangle").css("top",li.position().top + li.height()/2 + 5 +"px");
    });

    $(".parent_category_list>li").hover(function(){
        var dropUp = $(this).find(".child_category_wrapper");
        var dropUpWidth = dropUp.width();
        var postion = dropUp.offset();//.toggleClass("");
        var width = window.innerWidth;

        if(postion == undefined || width <= 850){
            return;
        }
        //console.log('x:'+postion.top+",y:"+postion.left);
        
        //console.log(postion.left);
        if(postion.left+dropUpWidth > width){
            $(this).addClass("child_will_attach");
            dropUp.addClass("child_category_wrapper_attach_right");
        }
        else if(postion.left < 0){
            $(this).addClass("child_will_attach");
            dropUp.addClass("child_category_wrapper_attach_left");
        }
        
        //child_category_wrapper
    });
    $("#search_button").click(function(){
        $("#search_button + .dropdown_block").toggleClass("search_rwd");
    });

    $("#bars").click(function(){
        $(this).toggleClass("fa-bars").toggleClass("fa-times");
        $(".mobile_menu").toggleClass("mobile_menu_active");
    });

    var now_select = 1;
    $(".first_layer>li").click(function(){
        $(".first_layer>li[data-order="+now_select+"]").removeClass("active");
        var li = $(this);
        li.addClass("active");

        var offset = li.position().top+li.height()/2 - 3
        $(".first_layer_triangle").css("top",offset);

        var order = li.attr("data-order");
        $(".second_layer>span[data-order="+now_select+"]").removeClass("active");
        $(".second_layer>span[data-order="+order+"]").addClass("active");
        now_select = order;
    });
});