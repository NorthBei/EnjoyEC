require("../dialog/dialog.js");

window.addEventListener("load",function(){
    $("#logout").on("click",function(){
        $("#logout_dialog").css("display","flex");
    });
    
});