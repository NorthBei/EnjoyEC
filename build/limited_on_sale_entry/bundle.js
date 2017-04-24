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