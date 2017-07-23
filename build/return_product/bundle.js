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
/******/ 	return __webpack_require__(__webpack_require__.s = 22);
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

/***/ 2:
/***/ (function(module, exports) {

window.addEventListener("load",function(){
    $(".colse_dialog").on("click",colseDialog);
    $(".dialog_cancel").on("click",colseDialog);
});

function colseDialog(){
    $(this).parents(".do_button_dialog").hide();
}

/***/ }),

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(0);
__webpack_require__(1);

window.addEventListener("load",function(){
    $('#all_product').click(function(event) {
        $('.want_return').prop('checked',this.checked);
    });

    $('.want_return').click(function(){
        if(!this.checked){
            $('#all_product').prop('checked',false);
        }
    });

    $('.input_count').on("change",function(){
        var max = parseInt($(this).attr("max"));
        var val = parseInt($(this).val());
        var isMax = (val> max)? true : false;
        
        if(isMax){
            $(this).val(max);
        }
        var isCheck = $(this).closest('.t_row').find(".want_return").prop('checked');
        
    });

    $(".select_return_reason").change(function(){
        var selected = $(':selected', this);
        var label = selected.closest('optgroup').attr('label');
        
        var parent = $(this).parent();
        var hasInputOther = (parent.has(".input_other").length != 0);

        if(selected.val() == "其他"){
            var input_other = $('<input type="text" class="input_other" placeholder="請填寫退貨原因"/>');
            if(!hasInputOther){
                parent.append(input_other);
                $(this).closest(".t_row").addClass("have_comment");
            }
        }
        else{
            if(hasInputOther){
                parent.find(".input_other").remove();
            }
            $(this).closest(".t_row").removeClass("have_comment");
        }
        
    });

    $(".dialog_button_wrapper .next").click(function(event){
        event.preventDefault();
        
        var obj = prepareArugment();
        if(obj["return_items"].length == 0){
            alert("choice return product");
            return;
        }

        var form = $(this).closest("form");
        if(form.attr("action") == ""){
            //use credit card

            $.ajax({
                type: "POST",
                url: ajaxurl,
                dataType: "json",
                data: {
                    "action":"return",
                    "return_note" :obj["return_note"], 
                    "return_items" :obj["return_items"], 
                    "order_id":$(".dialog_button_wrapper input[name=order_id]").val(),
                    "is_defective": obj["is_defective"],
                    "refund_type": "credit_card"
                },
                success: function(msg){
                    console.log(msg);
                    if(msg[0]["status"]){
                        $("#dialog").css("display","flex");
                    }
                },
                error:function(result){
                    console.log("error",result);
                }
            });
        
        }
        else{
            $(".dialog_button_wrapper input[name=return_note]").val(obj["return_note"]);
            $(".dialog_button_wrapper input[name=return_items]").val(JSON.stringify(obj["return_items"]));
            $(".dialog_button_wrapper input[name=is_defective]").val(obj["is_defective"]);
            form.submit();
        }
        
    });
});

function prepareArugment(){
    var return_items = [];
    var isDefective = 0;
    var return_note = "";
    $('.t_row').each(function(){
        var isCheck = $(this).find(".want_return").prop('checked');
                
        if(isCheck){
            
            var product = [];
            var link = $(this).find(".prodct_text_wrapper>.prodct_name");
            //"product_id"
            product[0] = link.attr("data-product-id");
            //"product_title"
            product[1] = link.text().trim();
            return_note+=$(this).find(".prodct_text_wrapper>a").text().trim()+",";
            
            var counter = $(this).find(".input_count")
            var max = parseInt(counter.attr("max"));
            var val = parseInt(counter.val());
            var number = (val> max)? max : val;
            
            //"return_quanity"
            product[2] = number;
            return_note+="退貨數量:"+number+","
            
            var selected = $(this).find('.select_return_reason :selected');
            var reason = selected.text();
            
            if(reason == "其他"){
                reason = $(this).find('.input_other').val();
            }
            //"return_reason"
            product[3] = reason;
            return_note+="退貨原因:"+reason+";"

            var label = selected.closest("optgroup").attr("label");
            
            if(label == "瑕疵品"){
                isDefective++;
            }

            return_items.push(product);
        }
    });
    //console.log(return_note);
    isDefective = (isDefective>0 ? true : false);

    return {
        "return_note":return_note,
        "return_items":return_items,
        "is_defective":isDefective
    };
}

/***/ })

/******/ });