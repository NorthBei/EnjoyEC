$(document).ready(function() { 
    $(".page_top_button").click(function() {
        $("html, body").animate({ scrollTop: 0 }, "fast");
        return false;
    });

    var topBtnShow = $(document).height()*2/3;
    var windowH = window.innerHeight;
    var isButtonShow = false,isButtonFixed = false;
    // console.log("top_btn_appear:"+top_btn_appear);
    // console.log("assign_height:"+assign_height);
    $(document).on("scroll",function(){
        var fiexdHeight = $("#header").height()+$("#main").height();
		var topheight= document.documentElement.scrollTop||document.body.scrollTop;
        var height = windowH+topheight;
        //console.log(height);
		if(height>= topBtnShow && isButtonShow == false){
            isButtonShow = true;
		    $(".page_top_button").css("display","block");
		}
        else if(height< topBtnShow && isButtonShow == true){
            isButtonShow = false;
            $(".page_top_button").css("display","none");
		}

        if(height > fiexdHeight && isButtonShow == true && isButtonFixed == false){
            isButtonFixed = true;
            $(".page_top_button").addClass("is_bottom");
        }
        else if(height < fiexdHeight && isButtonFixed == true){
            isButtonFixed = false;
            $(".page_top_button").removeClass("is_bottom");
        }
	});
});