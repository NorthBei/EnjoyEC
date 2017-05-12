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
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

//require("./header/header.js")

/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2);

window.addEventListener("load",function(){
    $("#logout").on("click",function(){
        $("#logout_dialog").css("display","flex");
    });
    
});

/***/ }),

/***/ 17:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(0);
__webpack_require__(1);

var data_orderID = "data-order_id";

$(document).ready(function(){
    $(".do_cancel").click(function(){
        var orderID = $(this).parent().parent().find("td[data-th=訂單編號]").text().trim();
        //console.log();
        $("#cancel_order_dialog").css("display","flex").attr(data_orderID,orderID);
    });

    $(".do_return").click(function(){
        $("#apply_return_dialog").css("display","flex");
    });

    $("#cancel_orde_success_dialog .dialog_check").on("click",colseDialog);

    $("#apply_return_dialog .dialog_check").on("click",function(){
        if($("#user_check_know:checked").length > 0){
            $("#apply_return_dialog").hide();
        }
    });

    $("#user_error,#expensive,#more_like").click(function(){
        document.querySelector(".cancel_reason").disabled = true;
    });
    $("#other").click(function(){
        document.querySelector(".cancel_reason").disabled = false;
    });

    $("#cancel_order_dialog .dialog_check").on("click",function(){
        var label = $('input[name=cancel_type]:checked').next().text();
        var cancel_note;
        if(label == "其他"){
            var text = $("#cancel_order_dialog .cancel_reason").val();
            if( text.length == 0){
                $("#cancel_order_dialog .alter_msg").css('visibility', 'visible');
                return;
            }
            else{
                $("#cancel_order_dialog .alter_msg").css('visibility', 'hidden');
                cancel_note = text;
            }

        }
        else{
            cancel_note = label;
            
            //$("#cancel_order_dialog").hide();
            //$("#cancel_orde_success_dialog").css("display","flex");
        }

        var order_id = $("#cancel_order_dialog").attr(data_orderID);
        //console.log(cancel_note,order_id);
        //send to server
        $.ajax({
            type: "POST",
            url: ajaxurl,
            data: {"action":"cancel",
                    "cancel_note":cancel_note,
                    "order_id":order_id},
            success: function(msg){
                $("#cancel_order_dialog").hide();
                $("#cancel_orde_success_dialog").css("display","flex");
            }
        });
        
    });
    
});

function showDialog(){
    $(this).css("display","flex");
}

function colseDialog(){
    $(this).parents(".do_button_dialog").hide();
}

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

window.addEventListener("load",function(){
    $(".colse_dialog").on("click",colseDialog);
    $(".dialog_cancel").on("click",colseDialog);
});

function colseDialog(){
    $(this).parents(".do_button_dialog").hide();
}

/***/ })

/******/ });