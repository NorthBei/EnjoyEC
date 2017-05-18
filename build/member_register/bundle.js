/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

//require("./header/header.js")

/***/ }),

/***/ 14:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(0);

window.addEventListener("load",function(){
    var formdata = {};
    // = {mail:regEmail,
	// 						pass:regPass,
	// 						name:regName,
	// 						phone:regPhone,
	// 						birth:birthArray};
    $("#email_register").on("click",function(){
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
            
            $(".register_data_section").show();
            $(".login_section").hide();
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

        var str = YYYY+"-"+YY+"-"+DD;

        isBirthValid = regexp.test(str);
        //console.log(str+" = register_birth "+isBirthValid);
        judgeShowErrorMsg($("#register_year").parent(),isBirthValid);

        if(!isBirthValid){
            $("#register_year").parent().next().addClass("marB32");
            $(".register_data_section .reminder.marB32").hide();
        }

        if(isNameValid && isPhoneValid && isBirthValid){
            formdata.action = "member_register";
            formdata.name = name;
            formdata.phone = phone;
            formdata.birth = [DD,MM,YYYY];
            
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

/***/ })

/******/ });