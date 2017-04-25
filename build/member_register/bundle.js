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
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1)

/***/ }),

/***/ 1:
/***/ (function(module, exports) {

$(document).ready(function() {
    var navHeight = $("#header").height();
    var isCrossHeader = false;
    
    $(document).on("scroll",function(){
        
        var topHeight = document.documentElement.scrollTop||document.body.scrollTop;
        // console.log("topHeight1:"+topHeight);
        // console.log("navHeight:"+navHeight);
        var width = window.innerWidth;
        
        if(topHeight>= navHeight && isCrossHeader == false && width >= 850){
            isCrossHeader = true;
            $("#header").addClass("scroll_header");
        }
        else if(topHeight< navHeight && isCrossHeader == true){
            isCrossHeader = false;
            $("#header").removeClass("scroll_header");
        }
        
    });

    $(".more_option>.child_category_list>li").hover(function(){
        var li = $(this);
        $(".more_option .first_layer_triangle").css("top",li.position().top + li.height()/2 + 5 +"px");
    });

    $(".parent_category_list>li").hover(function(){
        var dropUp = $(this).find(".child_category_wrapper");
        var dropUpWidth = dropUp.width();
        var postion = dropUp.offset();//.toggleClass("");
        var width = window.innerWidth;

        if(postion == undefined || width <= 850){
            return;
        }
        //console.log('x:'+postion.top+",y:"+postion.left);
        
        //console.log(postion.left);
        if(postion.left+dropUpWidth > width){
            $(this).addClass("child_will_attach");
            dropUp.addClass("child_category_wrapper_attach_right");
        }
        else if(postion.left < 0){
            $(this).addClass("child_will_attach");
            dropUp.addClass("child_category_wrapper_attach_left");
        }
        
        //child_category_wrapper
    });
    $("#search_button").click(function(){
        $("#search_button + .dropdown_block").toggleClass("search_rwd");
    });

    $("#bars").click(function(){
        $(this).toggleClass("fa-bars").toggleClass("fa-times");
        $(".mobile_menu").toggleClass("mobile_menu_active");
    });

    var now_select = 1;
    $(".first_layer>li").click(function(){
        $(".first_layer>li[data-order="+now_select+"]").removeClass("active");
        var li = $(this);
        li.addClass("active");

        var offset = li.position().top+li.height()/2 - 3
        $(".first_layer_triangle").css("top",offset);

        var order = li.attr("data-order");
        $(".second_layer>span[data-order="+now_select+"]").removeClass("active");
        $(".second_layer>span[data-order="+order+"]").addClass("active");
        now_select = order;
    });
});

/***/ }),

/***/ 15:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(0);

window.addEventListener("load",function(){
    $("#email_register").on("click",function(){
        $(".register_data_section").show();
        $(".login_section").hide();
    });

    $("#check_register_button").on("click",function(){
        $("#dialog p").css("visibility","visiable");
        showDialog();
    });

    $("#check_receive").on("click",function(){
        $("#dialog").hide();
    });
});

function showDialog(){
    $("#dialog").show().css('display', 'flex');
}

/***/ })

/******/ });