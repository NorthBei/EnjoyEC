require("../_general/general.js");

var isFB_Register = false;
var fb_data = {};
window.addEventListener("load",function(){

    $("#register_year,#register_month").on("keydown",function(e) {
		if (e.keyCode != 13 && e.keyCode != 8 && e.keyCode != 37 && e.keyCode != 38 && e.keyCode != 39 && e.button != 1 && e.button != 2 && e.button != 3) {
			if (this.value.length == this.maxLength) {
				$(this).next('.input_box').focus();
			}
		}
    });
    
    $("#register_password_twice").keydown(function(event){
        var trigger = event.which || event.keyCode;
        //console.log(trigger);
        if(trigger == 13){
            $("#email_register").trigger("click");                    
        }
    });

    $("#register_day").keydown(function(event){
        var trigger = event.which || event.keyCode;
        //console.log(trigger);
        if(trigger == 13){
            $("#check_register_button").trigger("click");                    
        }
    });

    var formdata = {};
    // = {mail:regEmail,
	// 						pass:regPass,
	// 						name:regName,
	// 						phone:regPhone,
	// 						birth:birthArray};
    $("#email_register").on("click",function(){
        $(this).closest(".form").find(".notice_message").hide();
        //var formdata = {};
        //At least one upper case english letter, (?=.*?[A-Z])
        //At least one lower case english letter, (?=.*?[a-z])
        //At least one digit, (?=.*?[0-9])
        //At least one special character, (?=.*?[#?!@$%^&*-])
        //Minimum 8 in length .{8,} (with the anchors)
        var regexp = new RegExp("(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}");
        var isEmailValid,isPasswordVaild,isPasswordSame = false;

        var register_mail = $("#register_mail");
        var mail = register_mail.val();
        isEmailValid = validateEmail(mail);
        //console.log("email"+isEmailValid);
        judgeShowErrorMsg(register_mail,isEmailValid);

        var register_password = $("#register_password");
        var pass = register_password.val();
        isPasswordVaild = regexp.test(pass);
        //console.log("register_password "+isPasswordVaild);
        judgeShowErrorMsg(register_password,isPasswordVaild);

        var register_password_twice = $("#register_password_twice");

        isPasswordSame = (register_password.val() == register_password_twice.val() ? true : false);
        //console.log("register_password 2 "+isPasswordSame);
        judgeShowErrorMsg(register_password_twice,isPasswordSame);

        if(isEmailValid && isPasswordVaild && isPasswordSame){
            formdata.mail = mail;
            formdata.pass = pass;
            
            checkEmailRepeat(mail);
            // $(".register_data_section").show();
            // $(".login_section").hide();
        }
        
    });

    $("#check_register_button").on("click",function(){
        
        var isNameValid,isPhoneValid,isBirthValid = false;

        var register_name = $("#register_name");
        var name = register_name.val();
        isNameValid = name == ""? false : true;
        console.log("register_name "+isNameValid);
        judgeShowErrorMsg(register_name,isNameValid);

        var register_phone = $("#register_phone");
        var phone = register_phone.val();
        isPhoneValid = phone == ""? false : true;
        console.log("register_phone "+isPhoneValid);
        judgeShowErrorMsg(register_phone,isPhoneValid);

        //Match entries that appear in the DD-MM-YYYY format
        //var $DD_MM_YYYY = "[0-9]{2}[-|\/]{1}[0-9]{2}[-|\/]{1}[0-9]{4}";
        //var regexp = new RegExp($DD_MM_YYYY);
        //var regexp2 = new RegExp(/(?:0[1-9]|[12][0-9]|3[01])\/(?:0[1-9]|1[0-2])\/(?:19|20\d{2})/);
        var expression =   "(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))";
        var regexp = new RegExp(expression);

        var YYYY = $("#register_year").val();
        var MM = $("#register_month").val();
        var DD = $("#register_day").val();

        var str = YYYY+"-"+MM+"-"+DD;

        isBirthValid = regexp.test(str);
        //console.log(str+" = register_birth "+isBirthValid);
        judgeShowErrorMsg($("#register_year").parent(),isBirthValid);

        if(!isBirthValid){
            $("#register_year").parent().next().addClass("marB32");
            $(".register_data_section .reminder.marB32").hide();
        }

        if(isNameValid && isPhoneValid && isBirthValid){
            
            formdata.name = name;
            formdata.phone = phone;
            formdata.birth = [DD,MM,YYYY];

            if(isFB_Register){
				formdata.action = "fb_login_user";
                formdata.fb_id = fb_data.fb_id;
                formdata.mail = $("#register_fb_email").val();
                //formdata.mail = fb_data.mail;
				//console.log('user is using fb login');
			}
            else{
				formdata.action = "member_register";
			}
            
            $.ajax({
				url: ajaxurl,
				type:"POST",
				dataType:'json',
				data: formdata,

				success: function(msg){
					console.log(msg);
                    if(msg[0]["status"]){
                        $("#dialog p").css("visibility","visiable");
                        showDialog(); 
                        //註冊完要登入
                        login(formdata.mail,formdata.pass);
                        formdata = {};
                        
                    }
				},
				 error:function(xhr){
					console.log(xhr);
				 }
			});
        }

    });

    $("#check_receive").on("click",function(){
        $("#dialog").hide();
    });

    $("#fb_register").on("click",function(){
		if( navigator.userAgent.match('CriOS') ) {
           FB.getLoginStatus( handleResponse );
        } 
        else {
            try {
                FB.login(handleResponse, {
                    scope: 'email,public_profile',//只能要到這兩個，這兩個是公開可以要的資料
                    return_scopes: true,
                    auth_type: 'rerequest'
                });
            } catch (err) {
                alert('Facebook Init is not loaded. Check that you are not running any blocking software or that you have tracking protection turned off if you use Firefox');
            }
        }
	});
	var handleResponse = function( response ) {
        if (response.status == 'connected') {
            var fb_response = response;
			//console.log(response.authResponse.email);
            /**
             * Send the obtained token to server side for extra checks and user data retrieval
             */
            $.ajax({
                data: {
                    action: "fb_login_data",
                    fb_response: fb_response,
                },
                type: "POST",
				dataType: 'json',
                url: ajaxurl,
                success: function (msg) {
					if(msg[0]["status"]){// true is 已註冊過的 看是要
                        //$("#dialog p").css("visibility","visiable");
                        //showDialog();
                        alert("已註冊過");
                    }
                    else{// false is 未註冊過的 跳填寫資料頁面
                        isFB_Register = true;
						fb_data.mail = msg.email;
						fb_data.fb_id = msg.id;
                        $(".register_data_section>h1").text("請核對會員資料就可完成註冊");
                        $("#register_fb_email").val(msg.email).show();
						$("#register_name").val(msg.last_name+msg.first_name);
						$(".register_data_section").show();
						$(".login_section").hide();
					}
                },
                error: function (data) {
                    alert('Enjoy server error');
                }
            });

        } else {
            
        }
	};
	
});

function showDialog(){
    $("#dialog").show().css('display', 'flex');
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function judgeShowErrorMsg(ele,isValid){
    if(isValid){
        ele.next().hide();
    }
    else{
        ele.next().show();
    }
}
function checkEmailRepeat(mail){
    var formdata = {};
    formdata.action = "check_register";
	formdata.mail = mail;
			
    $.ajax({
        url: ajaxurl,
        type:"POST",
        dataType:'json',
        data: formdata,

        success: function(msg){
            console.log(msg);
            if(msg[0]["status"]){
                //email尚未註冊過
                $("#mail_already_register").hide();
                $(".register_data_section").show();
                $(".login_section").hide();
            }
            else{
                //email已經註冊過
                $("#mail_already_register").show();
            }
        },
        error:function(xhr){
            console.log(xhr);
        }
    });
}
function login(logEmail,logPass){
    
    var formdata = {};
    formdata.action = "check_user";
    formdata.mail = logEmail;
    formdata.pass = logPass;
    $.ajax({
        url: ajaxurl,
        type:"POST",
        dataType:'json',
        data: formdata,

        success: function(msg){
            console.log(msg);
            if(msg[0]["status"]){
                window.location = msg[0]["message"]; 
            }
            else{
                console.log("error");
                //msg["message"]
                error_message.text(msg[0]["message"]);
            }

            // if(msg[0]["check"]){
            //     window.location = msg[0]["message"]; 
            // }
            // else{
            //     error_message.text(msg[0]["message"]);
            // }                       
        },

        error:function(xhr){
            console.log(xhr);
        }
    });
}