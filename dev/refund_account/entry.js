require("../_general/member_section/member_section.js");

window.addEventListener("load",function(){
    $(".next").click(function(){
        $("#check_dialog").css("display","flex");
    });
    $("#check_dialog .dialog_check").click(function(){
        var next = $(".next");
        var return_note = next.attr("data-return_note");
        var order_id = next.attr("data-order_id");
        var is_defective = next.attr("data-is_defective");

        if(return_note == "" || order_id == "" || is_defective == ""){
            alert("data error");
        }
        var account_name = $("#account_name").val();
        var bank_name = $("#bank_name").val();
        var account = $("#account").val();

        if(account_name == "" || bank_name == "" || account == ""){
            alert("input error");
        }

        var dialog = $(this).closest(".do_button_dialog");

        $.ajax({
            type: "POST",
            url: ajaxurl,
            dataType:"json",
            data: {
                "action":"return",
                "return_note" :return_note, 
                "order_id":order_id,
                "is_defective": is_defective, 
                "refund_type": "account",
                "account_name":account_name,
                "bank_name":bank_name,
                "account":account,
            },
            success: function(msg){
                console.log(msg);
                if(msg[0]["status"]){
                    dialog.hide();
                    $("#dialog").css("display","flex");
                }
            },
            error:function(result){
                alert("error");
                console.log("error",result);
            }
        });
        
    });
});