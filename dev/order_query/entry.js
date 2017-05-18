require("../_general/general.js");
require("../_general/member_section/member_section.js");

var data_orderID = "data-order_id";

$(document).ready(function(){
    $(".do_cancel").click(function(){
        var orderID = $(this).parent().parent().find("td[data-th=訂單編號]").text().trim();
        //console.log();
        $("#cancel_order_dialog").css("display","flex").attr(data_orderID,orderID);
    });

    $(".do_return").click(function(){
        $("#apply_return_dialog").css("display","flex");
    });

    $("#cancel_orde_success_dialog .dialog_check").on("click",colseDialog);

    $("#apply_return_dialog .dialog_check").on("click",function(){
        if($("#user_check_know:checked").length > 0){
            $("#apply_return_dialog").hide();
        }
    });

    $("#user_error,#expensive,#more_like").click(function(){
        document.querySelector(".cancel_reason").disabled = true;
    });
    $("#other").click(function(){
        document.querySelector(".cancel_reason").disabled = false;
    });

    $("#cancel_order_dialog .dialog_check").on("click",function(){
        var label = $('input[name=cancel_type]:checked').next().text();
        var cancel_note;
        if(label == "其他"){
            var text = $("#cancel_order_dialog .cancel_reason").val();
            if( text.length == 0){
                $("#cancel_order_dialog .alter_msg").css('visibility', 'visible');
                return;
            }
            else{
                $("#cancel_order_dialog .alter_msg").css('visibility', 'hidden');
                cancel_note = text;
            }

        }
        else{
            cancel_note = label;
            
            //$("#cancel_order_dialog").hide();
            //$("#cancel_orde_success_dialog").css("display","flex");
        }

        var order_id = $("#cancel_order_dialog").attr(data_orderID);
        //console.log(cancel_note,order_id);
        //send to server
        $.ajax({
            type: "POST",
            url: ajaxurl,
            data: {"action":"cancel",
                    "cancel_note":cancel_note,
                    "order_id":order_id},
            success: function(msg){
                if(msg[0]["status"]){
					$("#cancel_order_dialog").hide();
                    $("#cancel_orde_success_dialog").css("display","flex");
                }
                else{
                    console.log("error");
                    //msg["message"]
                }
            }
        });
        
    });
    
});

function showDialog(){
    $(this).css("display","flex");
}

function colseDialog(){
    $(this).parents(".do_button_dialog").hide();
}