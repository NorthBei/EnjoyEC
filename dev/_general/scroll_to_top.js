$(document).ready(function() { 
    $(".page_top_button").click(function() {
        $("html, body").animate({ scrollTop: 0 }, "fast");
        return false;
    });

    var top_btn_appear = $(document).height()*2/3;
    var windowH = window.innerHeight;
    var assign_height = $("#header").height()+$("#main").height();
    // console.log("top_btn_appear:"+top_btn_appear);
    // console.log("assign_height:"+assign_height);
    $(document).on("scroll",function(){
        
		var topheight= document.documentElement.scrollTop||document.body.scrollTop;
        var height = windowH+topheight;
        //console.log(height);
		if(height>= top_btn_appear){
		   $(".page_top_button").css("display","block");
		}
        else if(height< top_btn_appear){
           $(".page_top_button").css("display","none");
		}

        if(height > assign_height){
            $(".page_top_button").addClass("is_bottom");
        }
        else if(height < assign_height){
            $(".page_top_button").removeClass("is_bottom");
        }
	});
});