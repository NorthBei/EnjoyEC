require("../_general/general.js");
$(document).ready(function(){
    $(".do_cancel").click(function(){
        $("#cancel_order_dialog").css("display","flex");
    });

    $(".do_return").click(function(){
        $("#apply_return_dialog").css("display","flex");
    });

    $(".colse_dialog").on("click",colseDialog);
    $(".dialog_cancel").on("click",colseDialog);
    $("#cancel_orde_success_dialog .dialog_check").on("click",colseDialog);

    $("#apply_return_dialog .dialog_check").on("click",function(){
        if($("#user_check_know:checked").length > 0){
            $("#apply_return_dialog").hide();
        }
    });

    $("#cancel_order_dialog .dialog_check").on("click",function(){
        if($("#cancel_order_dialog .cancel_reason").val().length == 0){
            $("#cancel_order_dialog .alter_msg").css('visibility', 'visible');
        }
        else{
            //send to server
            $("#cancel_order_dialog").hide();
            $("#cancel_orde_success_dialog").css("display","flex");
        }
    });
    
});

function showDialog(){
    $(this).css("display","flex");
}

function colseDialog(){
    $(this).parents(".do_button_dialog").hide();
}