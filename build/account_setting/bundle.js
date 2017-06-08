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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

//require("./header/header.js")

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2);

window.addEventListener("load",function(){
    $("#logout").on("click",function(){
        $("#logout_dialog").css("display","flex");
    });
    
});

/***/ }),
/* 2 */
/***/ (function(module, exports) {

window.addEventListener("load",function(){
    $(".colse_dialog").on("click",colseDialog);
    $(".dialog_cancel").on("click",colseDialog);
});

function colseDialog(){
    $(this).parents(".do_button_dialog").hide();
}

/***/ }),
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(0);
__webpack_require__(1);

window.addEventListener("load",function(){
    var isEdit = true;
    $(".edit_profile").on("click",function(){
        
        if(isEdit){
            var city_name = $("#city_name").text();
			alert("city_name:"+city_name);
            var region_name = $("#region_name").text();
			alert("region_name:"+region_name);
            $("#receive_city_id option[value='"+city_name+"']").attr('selected','selected');
			$("#receive_city_id").trigger("change");
			alert("city option:");
            $("#receive_region_id option[value='"+region_name+"']").attr('selected','selected');
			alert("region option:");
            $('.reset_password_row').css('visibility','hidden');
			alert("4");
            flex($(".select_wrapper"));
			alert("5");
            $(".input_address").css("display","block");
			alert("6");
        }
        else{
			//console.log("按下確定");
			var emalInput = $(".td_value input[type=email]");

			var isEmailValid,isNameValid,isPhoneValid,isAddressValid = false;
			var emailValue = emalInput.val();
			isEmailValid = validateEmail(emailValue);
			//console.log(isEmailValid);
			judgeShowErrorMsg(emalInput,isEmailValid);

			var nameInput = $(".td_value .input_name");
			var nameValue = nameInput.val()
			isNameValid = (nameValue == "" ? false : true);
			//onsole.log(isNameValid);
			judgeShowErrorMsg(nameInput,isNameValid);

			var phoneInput = $(".td_value input[type=tel]");
			var phoneValue = phoneInput.val();
			isPhoneValid = (phoneValue == "" ? false : true);
			//console.log(isPhoneValid);
			judgeShowErrorMsg(phoneInput,isPhoneValid);

            var city_name = $("#receive_city_id option:selected").text();
            var region_name = $("#receive_region_id option:selected").text();
			var address = $(".input_address input[type=text]").val();
			if(city_name!= "" && region_name != "" && address != ""){
				isAddressValid = true;
			}
			judgeShowErrorMsg($(".input_address>div"),isAddressValid);
			
			if(isEmailValid && isNameValid && isPhoneValid && isAddressValid){
				
				var formdata = {};
				formdata.action = 'edit_member_detail';
				formdata.email = emailValue;
				formdata.name = nameValue;
				formdata.phone = phoneValue;
				formdata.city = city_name;
				formdata.area = region_name;
				formdata.address = address;
				
				$.ajax({
					url: ajaxurl,
					type:"POST",
					dataType:'json',
					data: formdata,
					success: function(msg){
						console.log(msg);
						//judge format
						if(msg[0]["status"]){
							flex($("#modify_success_dialog"));
							setInterval(function(){ $("#modify_success_dialog").hide(); }, 2000);
						}
						else{
							console.log("error");
							//msg["message"]
						}  
					},

					error:function(xhr){
						console.log(xhr);
					}
				});

				$("#city_name").text(city_name);
				$("#region_name").text(region_name);
				$('.reset_password_row').css('visibility','visible');
				$(".select_wrapper").hide();
				flex($(".input_address"));

			}
			else{
				return;
			}
			
        }
		isEdit=!isEdit;
        $(".input_edit").toggleClass("input_edit_now").prop("disabled",isEdit);
        $(".edit_disappear").toggle();
		$(".alter_msg").toggle();

        var editButton = (isEdit? "編輯":"確定");
        $(this).text(editButton);      

    });
    
    $("#receive_city_id").on("change",changeCity);
    $(".reset_password").click(function(){
        flex($("#reset_password_dialog"));
    });

    $("#reset_password_dialog .dialog_check").click(function(){
		var regexp = new RegExp("(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}");
		var oldPasswrodValid,newPasswrodValid,isPasswordSame = false;

		var old_password = $("#old_passwrord");
		var oldPasswordValue = old_password.val();
		oldPasswrodValid = (oldPasswordValue == "" ? false : true);
		console.log(oldPasswrodValid);
		judgeShowErrorMsg(old_password,oldPasswrodValid);

		var new_passwrord = $("#new_passwrord");
        var newPasswrodValue = new_passwrord.val();
        newPasswrodValid = regexp.test(newPasswrodValue);
		judgeShowErrorMsg(new_passwrord,newPasswrodValid);
		console.log("newPasswrodValid:"+newPasswrodValid);
		if(!newPasswrodValid){
			new_passwrord.parent().find(".dialog_alter_msg").hide();
		}

		var new_same_passwrord = $("#new_same_passwrord");
        isPasswordSame = (new_same_passwrord.val() == newPasswrodValue ? true : false);
        judgeShowErrorMsg(new_same_passwrord,isPasswordSame);
		console.log(isPasswordSame);

		if(oldPasswrodValid && newPasswrodValid & isPasswordSame){
			//ajax
			var formdata = {}
			formdata.action = 'change_password';
			formdata.oldPass = oldPasswordValue;
			formdata.newPass = newPasswrodValue;

			$.ajax({
				url: ajaxurl,
				type:"POST",
				dataType:'json',
				data: formdata,
				success: function(msg){
					console.log(msg);
					//judge format
					if(msg[0]["status"]){
						$("#reset_password_dialog").hide();
        				flex($("#reset_password_success_dialog").show());
					}
					else{
						console.log("error");
						//msg["message"]
					}  
				},

				error:function(xhr){
					console.log(xhr);
				}
			});

			$("#reset_password_dialog").hide();
        	flex($("#reset_password_success_dialog").show());
		}
    });

    $("#reset_password_success_dialog .dialog_check").click(function(){
        $("#reset_password_success_dialog").hide();
    });
});

var Zone = new Array(27);

	Zone[1]=new Array("中正區","大同區","中山區","松山區","大安區","萬華區","信義區","士林區","北投區","內湖區","南港區","文山區")

	Zone[2]=new Array("仁愛區","信義區","中正區","中山區","安樂區","暖暖區","七堵區")

	Zone[3]=new Array("宜蘭市","頭城鎮","礁溪鄉","壯圍鄉","員山鄉","羅東鎮","三星鄉","大同鄉","五結鄉","冬山鄉","蘇澳鎮","南澳鄉")

	Zone[4]=new Array("萬里區","金山區","板橋區","汐止區","深坑區","石碇區","瑞芳區","平溪區","雙溪區","貢寮區","新店區","坪林區","烏來區","永和區","中和區","土城區","三峽區","樹林區","鶯歌區","三重區","新莊區","泰山區","林口區","蘆洲區","五股區","八里區","淡水區","三芝區","石門區")

	Zone[5]=new Array("南竿鄉","北竿鄉","莒光鄉","東引鄉")

	Zone[6]=new Array("北區","東區","香山區")

	Zone[7]=new Array("竹北市","湖口鄉","新豐鄉","新埔鎮","關西鎮","芎林鄉","寶山鄉","竹東鎮","五峰鄉","橫山鄉","尖石鄉","北埔鄉","峨眉鄉")

	Zone[8]=new Array("中壢區","平鎮區","龍潭區","楊梅區","新屋區","觀音區","桃園區","龜山區","八德區","大溪區","復興區","大園區","蘆竹區")

	Zone[9]=new Array("竹南鎮","頭份鎮","三灣鄉","南庄鄉","獅潭鄉","後龍鎮","通霄鎮","苑裡鎮","苗栗市","造橋鄉","頭屋鄉","公館鄉","大湖鄉","泰安鄉","銅鑼鄉","三義鄉","西湖鄉","卓蘭鎮")

	Zone[10]=new Array("中區","東區","南區","西區","北區","北屯區","西屯區","南屯區","太平區","大里區","霧峰區","烏日區","豐原區","后里區","石岡區","東勢區","和平區","新社區","潭子區","大雅區","神岡區","大肚區","沙鹿區","龍井區","梧棲區","清水區","大甲區","外埔區","大安區")

	Zone[11]=new Array("南投市","中寮鄉","草屯鎮","國姓鄉","埔里鎮","仁愛鄉","名間鄉","集集鎮","水里鄉","魚池鄉","信義鄉","竹山鎮","鹿谷鄉")

	Zone[12]=new Array("彰化市","芬園鄉","花壇鄉","秀水鄉","鹿港鎮","福興鄉","線西鄉","和美鎮","伸港鄉","員林鎮","社頭鄉","永靖鄉","埔心鄉","溪湖鎮","大村鄉","埔鹽鄉","田中鎮","北斗鎮","田尾鄉","埤頭鄉","溪州鄉","竹塘鄉","二林鎮","大城鄉","芳苑鄉","二水鄉")

	Zone[13]=new Array("東區","西區")

	Zone[14]=new Array("番路鄉","梅山鄉","竹崎鄉","阿里山鄉","中埔鄉","大埔鄉","水上鄉","鹿草鄉","太保市","朴子市","東石鄉","六腳鄉","新港鄉","民雄鄉","大林鎮","溪口鄉","義竹鄉","布袋鎮")

	Zone[15]=new Array("斗南鎮","大埤鄉","虎尾鎮","土庫鎮","褒忠鄉","東勢鄉","台西鄉","崙背鄉","麥寮鄉","斗六市","林內鄉","古坑鄉","莿桐鄉","西螺鎮","二崙鄉","北港鎮","水林鄉","口湖鄉","四湖鄉","元長鄉")

	Zone[16]=new Array("中西區","東區","南區","北區","安平區","安南區","永康區","歸仁區","新化區","左鎮區","玉井區","楠西區","南化區","仁德區","關廟區","龍崎區","官田區","麻豆區","佳里區","西港區","七股區","將軍區","學甲區","北門區","新營區","後壁區","白河區","東山區","六甲區","下營區","柳營區","鹽水區","善化區","大內區","山上區","新市區","安定區")

	Zone[17]=new Array("馬公市","西嶼鄉","望安鄉","七美鄉","白沙鄉","湖西鄉")

	Zone[18]=new Array("金沙鎮","金湖鎮","金寧鄉","金城鎮","烈嶼鄉","烏坵鄉")

	Zone[19]=new Array("新興區","前金區","苓雅區","鹽埕區","鼓山區","旗津區","前鎮區","三民區","楠梓區","小港區","左營區","仁武區","大社區","岡山區","路竹區","阿蓮區","田寮區","燕巢區","橋頭區","梓官區","彌陀區","永安區</lenselectinstallment園區","鳥松區","大樹區","旗山區","美濃區","六龜區","內門區","杉林區","甲仙區","桃源區","那瑪夏區","茂林區","茄萣區")

	Zone[20]=new Array("台東市","綠島鄉","蘭嶼鄉","延平鄉","卑南鄉","鹿野鄉","關山鎮","海端鄉","池上鄉","東河鄉","成功鎮","長濱鄉","太麻里鄉","金峰鄉","大武鄉","達仁鄉")

	Zone[21]=new Array("屏東市","三地鄉","霧台鄉","瑪家鄉","九如鄉","里港鄉","高樹鄉","鹽埔鄉","長治鄉","麟洛鄉","竹田鄉","內埔鄉","萬丹鄉","潮州鎮","泰武鄉","來義鄉","萬巒鄉","崁頂鄉","新埤鄉","南州鄉","林邊鄉","東港鎮","琉球鄉","佳冬鄉","新園鄉","枋寮鄉","枋山鄉","春日鄉","獅子鄉","車城鄉","牡丹鄉","恆春鎮","滿州鄉")

	Zone[22]=new Array("花蓮市","新城鄉","秀林鄉","吉安鄉","壽豐鄉","鳳林鎮","光復鄉","豐濱鄉","瑞穗鄉","萬榮鄉","玉里鎮","卓溪鄉","富里鄉")

function changeCity() {
	var selectedCountyIndex = $("#receive_city_id").get(0).selectedIndex;
	var regionInput = $("#receive_region_id").get(0);
	//if (selectedCountyIndex=>0){
		regionInput.length = Zone[selectedCountyIndex].length +1;
		//regionInput.options[0].value = "";
		//regionInput.options[0].text = "";
		for (i = 1; i <= Zone[selectedCountyIndex].length; i++) {
			regionInput.options[i].value = Zone[selectedCountyIndex][i-1];
			regionInput.options[i].text = Zone[selectedCountyIndex][i-1];
		}
    //}
	// else{
	// 	regionInput.length = 1;
	// 	regionInput.options[0].value = "";
	// 	regionInput.options[0].text = "請選擇鄉鎮市區";
	// 	$("#radd").val("");
	// }
	//$("#receive_zip_id").val("");
	//$("#receive_region_id").val("");

	//showZipCode(countyInput, zoneInput, post ,address ,countyindex);
}

function flex(ele){
    ele.css("display","flex");
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
/******/ ]);