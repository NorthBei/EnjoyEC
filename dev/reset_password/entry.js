require("../_general/general.js");
require("../_general/login/login.js");

window.addEventListener("load",function(){
    
	$("#reset_button").click(function(){
        
        //At least one upper case english letter, (?=.*?[A-Z])
        //At least one lower case english letter, (?=.*?[a-z])
        //At least one digit, (?=.*?[0-9])
        //At least one special character, (?=.*?[#?!@$%^&*-])
        //Minimum 8 in length .{8,} (with the anchors)
        var regexp = new RegExp("(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}");

        var check_password = $("#check_password").val();
        var double_check_password = $("#double_check_password").val();

        var isPasswordVaild = regexp.test(check_password);
        var isPasswordSame = (check_password == double_check_password);
        //console.log("isPasswordVaild:"+isPasswordVaild);
        //console.log("isPasswordSame:"+isPasswordSame);
        if(!isPasswordVaild || !isPasswordSame){
            $(".form .error_message").css("visibility","visible");
            return;
        }
        
        $(".form .error_message").css("visibility","hidden");

		var parts = window.location.search.substr(1).split("&");
		var $_GET = {};
		for (var i = 0; i < parts.length; i++) {
			var temp = parts[i].split("=");
			$_GET[decodeURIComponent(temp[0])] = decodeURIComponent(temp[1]);
		}
		
		var formdata = {};
		
		formdata.action ="reset_password";
		formdata.password = $("#check_password").val();
		formdata.login = $_GET.login;

		$.ajax({
            url: ajaxurl,
            type:"POST",
            dataType:'json',
            data: formdata,
            success: function(msg){
                console.log(msg);
                if(msg[0]["status"]){
                    $("#dialog").show().css('display', 'flex');                  
                }
            },
            error:function(xhr){
                console.log(xhr);
            }
		});
    });
});
