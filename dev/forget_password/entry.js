require("../_general/general.js");
require("../_general/login/login.js");

window.addEventListener("load",function(){

    $("#register_button").on("click",function(){
        $("#dialog").show().css('display', 'flex');
    });    
});