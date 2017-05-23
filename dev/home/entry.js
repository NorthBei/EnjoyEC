//window.jQuery = require("../_general/general_entry.js");
require("../_general/third_part/slick-1.6.0/slick/slick.min.js");
require("../_general/general.js");
$(document).ready(function(){
    $('.slick_slide').slick({
        dots: true,
        autoplay: true,
        autoplaySpeed: 3000,
        prevArrow:'<img src="./asset/Circled-Chevron-Left.png" id="slick-prev" class="slick-arrow">',
        nextArrow:'<img src="./asset/Circled-Chevron-Right.png" id="slick-next" class="slick-arrow">'
    });

    $("#subscribe_btn").click(function(){
        /*訂閱者email為usermail*/
        /*
        成功回傳:"status"=>true, "message"=>"Success"
        非正確email格式失敗回傳:"status"=>False, "message"=>"email error"
        重複email失敗回傳:"status"=>False, "message"=>"email existed"
        */
        var email = $("#useremail").val();
        //console.log("email "+validateEmail(email));
        if(!validateEmail(email)){
            console.log("email format error");
            return;
        }
        $.ajax({
            type: "POST",
            url: ajaxurl,
            data: {"action":"add_subscriber",
				        "q":email},
            success: function(msg){
                console.log(msg);
                if(msg[0]["status"]){
                    $("#useremail").val("");
                }
                else{
                    console.log("error");
                }
                
            }   
        });
    });

});

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
