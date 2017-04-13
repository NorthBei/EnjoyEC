require("../_general/general.js");
require("../_general/login/login.js");

window.addEventListener("load",function(){

    $("#register_button").on("click",function(){
        $(".forget_password_section").hide();
        $(".reset_password_section").show();
        showDialog();
    });

    $("#check_receive").on("click",function(){
        $("#dialog").hide();
    });

    $("#reset_button").on("click",function(){
        $("#dialog h1").text("重設密碼成功");
        $("#dialog p").text("請使用新密碼重新登入");
        showDialog();
    });

    
});

function showDialog(){
    $("#dialog").show().css('display', 'flex');
}