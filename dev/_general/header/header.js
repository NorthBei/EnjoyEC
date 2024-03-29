$(document).ready(function() {
    var navHeight = $("#header").height();
    var isCrossHeader = false;
    var tablet_width = 850;
    $(document).on("scroll",function(){
        
        var topHeight = document.documentElement.scrollTop||document.body.scrollTop;
        // console.log("topHeight1:"+topHeight);
        // console.log("navHeight:"+navHeight);
        var width = document.body.clientWidth;
        
        if(topHeight>= navHeight && isCrossHeader == false && width >= tablet_width){
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
        var width = document.body.clientWidth;

        if(postion == undefined || width <= tablet_width){
            
        }
        else{
            if(postion.left+dropUpWidth > width){
                $(this).addClass("child_will_attach");
                dropUp.addClass("child_category_wrapper_attach_right");
            }
            else if(postion.left < 0){
                $(this).addClass("child_will_attach");
                dropUp.addClass("child_category_wrapper_attach_left");
            }
        }
        //console.log('x:'+postion.top+",y:"+postion.left);
        
        //console.log(postion.left);
        $(this).find(".child_category_wrapper").toggleClass("dropdown_block_active");
    });

    $("#bars").click(function(){
        event.stopPropagation();
        $(this).toggleClass("fa-bars").toggleClass("fa-times");
        $(".mobile_menu").toggleClass("mobile_menu_active");
    });
    //set .more_option height
    var max_height = 0;
    $(".more_option_child_wrapper").each(function(index){
        if($( this ).outerHeight()>max_height){
            max_height = $( this ).outerHeight();
        }
    });
    
    $(".more_option").height(max_height);
    //set .more_option height
    
    $(".dropdown_block_wrapper").hover(
        function(){
            var width = document.body.clientWidth;
            if(width < tablet_width){
                return;
            }

            var dropUp = $(this).find(".dropdown_block");
            
            var dropUpWidth = dropUp.width();
            //console.log(dropUpWidth);
            var postion = dropUp.offset();
            //console.log(postion.top,postion.left,width);


            if(postion == undefined){
                
            }
            else{
                if(postion.left+dropUpWidth > width){
                    $(this).addClass("dropdown_will_attach_right");
                }
            }

            dropUp.addClass("dropdown_block_active");
        },
        function(){
            var width = document.body.clientWidth;
            if(width < tablet_width){
                return;
            }
            var hasClass = $(this).hasClass("dropdown_will_attach_right");
            if(hasClass){
                $(this).removeClass("dropdown_will_attach_right");
            }
            $(this).find(".dropdown_block").removeClass("dropdown_block_active");
        }
    );

    $(".dropdown_block_wrapper").click(function(){
        event.stopPropagation();
        var width = document.body.clientWidth;
        if(width > tablet_width){
            return;
        }
        $(this).find(".dropdown_block").toggleClass("dropdown_block_active");
    });

    var now_select = 1;
    $(".first_layer>li").click(function(e){
        e.stopPropagation();
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

    $(document).click(function() {

        var bars = $("#bars");
        
        if(bars.hasClass("fa-times")){
            $("#bars").toggleClass("fa-bars").toggleClass("fa-times");
            $(".mobile_menu").toggleClass("mobile_menu_active");
        }

        var block = $(".dropdown_block_wrapper").find(".dropdown_block");
        if(block.hasClass("dropdown_block_active")){
            var width = document.body.clientWidth;
            if(width > tablet_width){
                return;
            }
            block.removeClass("dropdown_block_active");
        }
    });
});