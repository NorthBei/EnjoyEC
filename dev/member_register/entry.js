require("../_general/general.js");

window.addEventListener("load",function(){
    $("#email_register").on("click",function(){
        $("#dialog p").css("visibility","visiable");
        showDialog();
        $(".register_data_section").show();
        $(".login_section").hide();
    });

    $("#register_button").on("click",function(){
        $("#dialog p").css("visibility","hidden");
        showDialog();
    });

    $("#check_receive").on("click",function(){
        $("#dialog").hide();
    });
});

function showDialog(){
    $("#dialog").show().css('display', 'flex');
}