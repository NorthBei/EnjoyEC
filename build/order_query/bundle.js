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
/******/ 	return __webpack_require__(__webpack_require__.s = 18);
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

/***/ 18:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(0);
__webpack_require__(1);

var data_orderID = "data-order_id";
var data_pay_way = "data-pay_way";
var data_total_money = "data-total_money";

$(document).ready(function(){
    $(".do_cancel").click(function(){
        var orderID = $(this).closest("tr").find("td[data-th=訂單編號]").text().trim();
        //console.log();
        if($(this).hasClass("credit_card")){
            var total_money = $(this).closest("tr").find("td[data-th=總計金額]").text();
            $("#cancel_order_dialog")
                .attr(data_pay_way,"credit_card")
                .attr(data_total_money,total_money);
        }
        else{
            $("#cancel_order_dialog").attr(data_pay_way,"account");
        }
        $("#cancel_order_dialog").css("display","flex").attr(data_orderID,orderID);
    });

    $(".do_return").click(function(){
        var orderID = $(this).closest("tr").find("td[data-th=訂單編號]").text().trim();
        $("#apply_return_dialog").css("display","flex")
            .find(".dialog_button_wrapper input[name='orderID']").val(orderID);
    });

    $("#cancel_orde_success_dialog .dialog_check").on("click",function(){
        colseDialog();
        location.reload();
    });

    $("#apply_return_dialog .dialog_check").on("click",function(event){
        if($("#user_check_know:checked").length > 0){
            // $("#apply_return_dialog").hide();
            // var url = $(this).attr("data-url");
            // var order_id = $(this).attr(data_orderID);
            // window.location = url+"?orderID="+order_id;
        }
        else{
            $("#apply_return_dialog .notice").css("visibility","visible");
            event.preventDefault();
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
        var pay_way = $("#cancel_order_dialog").attr(data_pay_way);
        //console.log(cancel_note,order_id);
        //send to server
        $.ajax({
            type: "POST",
            url: ajaxurl,
            data: {"action":"cancel_refund",
                    "cancel_note":cancel_note,
                    "order_id":order_id,
                    "refund_type":pay_way,
                  },
            dataType:'json',
            success: function(msg){
                if(msg[0]["status"]){
					$("#cancel_order_dialog").hide();
                    if(pay_way == "credit_card"){
                        var total_money = $("#cancel_order_dialog").attr(data_total_money);
                        $("#refund_money").text(total_money);
                        $("#cancel_orde_success_dialog .cancel_with_mart").hide();
                        $("#cancel_orde_success_dialog .cancel_with_credit_card").show();
                        
                    }
                    else{
                        $("#cancel_orde_success_dialog .cancel_with_mart").show();
                        $("#cancel_orde_success_dialog .cancel_with_credit_card").hide();
                    }
                    $("#cancel_orde_success_dialog").css("display","flex");
                }
                else{
                    console.log("error");
                }
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