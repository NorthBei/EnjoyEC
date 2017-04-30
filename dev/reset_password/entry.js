require("../_general/general.js");
require("../_general/login/login.js");

window.addEventListener("load",function(){
    $("#reset_button").click(function(){
        $("#dialog").show().css('display', 'flex');
    });
});