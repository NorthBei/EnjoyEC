window.addEventListener("load",function(){
    $(".next").click(function(){
        
        var return_note = $(this).attr("data-return_note");
        var order_id = $(this).attr("data-order_id");
        var is_defective = $(this).attr("data-is_defective");

        if(return_note == "" || return_note == "" || return_note == ""){
            alert("data error");
        }
        var account_name = $("#account_name").val();
        var bank_name = $("#bank_name").val();
        var account = $("#account").val();

        if(account_name == "" || bank_name == "" || account == ""){
            alert("input error");
        }

        $.ajax({
            type: "POST",
            url: ajaxurl,
            data: {
                "action":" return",
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
                    $("#dialog").css("display","flex");
                }
            },
            error:function(result){
                console.log("error",result);
            }
        });
        
    });
});