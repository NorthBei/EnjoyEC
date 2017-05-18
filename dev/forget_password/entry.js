require("../_general/general.js");
require("../_general/login/login.js");

// window.addEventListener("load",function(){

//     $("#register_button").on("click",function(){
//         $("#dialog").show().css('display', 'flex');
//     });    
// });

window.addEventListener("load",function(){

    $("#register_button").on("click",function(){

        var isEmailValid,isBirthValid = false;
        
		//新增部分
		var forget_mail = $("#forget_mail").val();

        isEmailValid = validateEmail(forget_mail);
        console.log("isEmailValid:"+isEmailValid);
		var forget_date_year = $("#forget_date_year").val();
		var forget_date_month = $("#forget_date_month").val();
		var forget_date_day = $("#forget_date_day").val();
        $(".form .error_message").text("Email或生日輸入錯誤");
        //regex for dd/mm/yyyy
        var expression =   "(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))";
        var regexp = new RegExp(expression);
        // var $DD_MM_YYYY = "[0-9]{2}[-|\/]{1}[0-9]{2}[-|\/]{1}[0-9]{4}";
        // var regexp = new RegExp($DD_MM_YYYY);
        var str = forget_date_year+"-"+forget_date_month+"-"+forget_date_day;

        isBirthValid = regexp.test(str);
		console.log("isBirthValid:"+isBirthValid);
        if(!isBirthValid || !isBirthValid){
            $(".form .error_message").text("Email或生日輸入錯誤").css("visibility","visible");
            return;
        }
        $(".form .error_message").css("visibility","hidden");
		var formdata = {};
		console.log(forget_date_day);
		console.log(forget_date_month);
		console.log(forget_date_year);
		formdata.mail = forget_mail;
		formdata.birthday = [forget_date_day,forget_date_month,forget_date_year];
		formdata.action = "forget_password";
		
		$.ajax({
				url: ajaxurl,
				type:"POST",
				dataType:'json',
				data: formdata,

				success: function(msg){
					console.log(msg);
                    if(msg["0"]["status"]){
                        $("#dialog").show().css('display', 'flex');
					}else{
						alert("fuck");
					}
				},

				 error:function(xhr){
					console.log(xhr);
				 }
			});
        
    });    
});

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}