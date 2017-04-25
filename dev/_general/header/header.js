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

    $("#bars").click(function(){
        //$(".more_option")
        console.log("x");
    });
});