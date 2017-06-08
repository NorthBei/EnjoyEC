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
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

//require("./header/header.js")

/***/ }),

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(0);
__webpack_require__(4);

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
						// ("status"=>true, "message"=>"有寄出去");
						$(".form .error_message").css("visibility","hidden");;
					}
					else{
						if(msg["0"]["message"] == "沒寄出去"){
							$(".form .error_message").text("Enjoy server error").css("visibility","visible");
						}
						else{
							$(".form .error_message").text(msg["0"]["message"]).css("visibility","visible");
						}
						// ("status"=>false, "message"=>"沒寄出去");
						// ("status"=>false, "message"=>"該Email尚未註冊");
						// ("status"=>false, "message"=>"Email或生日輸入錯誤");
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

/***/ }),

/***/ 4:
/***/ (function(module, exports) {



/***/ })

/******/ });