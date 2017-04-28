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
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1)

/***/ }),

/***/ 1:
/***/ (function(module, exports) {

$(document).ready(function() {
    var navHeight = $("#header").height();
    var isCrossHeader = false;
    var tablet_width = 850;
    $(document).on("scroll",function(){
        
        var topHeight = document.documentElement.scrollTop||document.body.scrollTop;
        // console.log("topHeight1:"+topHeight);
        // console.log("navHeight:"+navHeight);
        var width = document.body.clientWidth;
        
        if(topHeight>= navHeight && isCrossHeader == false && width >= tablet_width){
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
        var width = document.body.clientWidth;

        if(postion == undefined || width <= tablet_width){
            
        }
        else{
            if(postion.left+dropUpWidth > width){
                $(this).addClass("child_will_attach");
                dropUp.addClass("child_category_wrapper_attach_right");
            }
            else if(postion.left < 0){
                $(this).addClass("child_will_attach");
                dropUp.addClass("child_category_wrapper_attach_left");
            }
        }
        //console.log('x:'+postion.top+",y:"+postion.left);
        
        //console.log(postion.left);
        $(this).find(".child_category_wrapper").toggleClass("dropdown_block_active");
    });

    $("#bars").click(function(){
        $(this).toggleClass("fa-bars").toggleClass("fa-times");
        $(".mobile_menu").toggleClass("mobile_menu_active");
    });

    
    $(".dropdown_block_wrapper>i.fa").hover(function(){
        var width = document.body.clientWidth;
        if(width < tablet_width){
            return;
        }

        var dropUp = $(this).parent().find(".dropdown_block");
        
        var dropUpWidth = dropUp.width();
        console.log(dropUpWidth);
        var postion = dropUp.offset();
        console.log(postion.top,postion.left,width);


        if(postion == undefined){
            
        }
        else{
            if(postion.left+dropUpWidth > width){
                console.log($(this).parent());
                $(this).parent().addClass("dropdown_will_attach_right");
            }
        }

        dropUp.toggleClass("dropdown_block_active");
    });

    $(".dropdown_block").hover(function(){
        $(this).toggleClass("dropdown_block_active");
    });

    $(".dropdown_block_wrapper").click(function(){
        var width = document.body.clientWidth;
        if(width > tablet_width){
            return;
        }
        $(this).find(".dropdown_block").toggleClass("dropdown_block_active");
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

/***/ 14:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(4);
__webpack_require__(0);

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

$(document).ready(function() { 
    $(".page_top_button").click(function() {
        $("html, body").animate({ scrollTop: 0 }, "fast");
        return false;
    });

    var topBtnShow = $(document).height()*2/3;
    var windowH = window.innerHeight;
    var isButtonShow = false,isButtonFixed = false;
    // console.log("top_btn_appear:"+top_btn_appear);
    // console.log("assign_height:"+assign_height);
    $(document).on("scroll",function(){
        var fiexdHeight = $("#header").height()+$("#main").height();
		var topheight= document.documentElement.scrollTop||document.body.scrollTop;
        var height = windowH+topheight;
        //console.log(height);
		if(height>= topBtnShow && isButtonShow == false){
            isButtonShow = true;
		    $(".page_top_button").css("display","block");
		}
        else if(height< topBtnShow && isButtonShow == true){
            isButtonShow = false;
            $(".page_top_button").css("display","none");
		}

        if(height > fiexdHeight && isButtonShow == true && isButtonFixed == false){
            isButtonFixed = true;
            $(".page_top_button").addClass("is_bottom");
        }
        else if(height < fiexdHeight && isButtonFixed == true){
            isButtonFixed = false;
            $(".page_top_button").removeClass("is_bottom");
        }
	});
});

/***/ })

/******/ });