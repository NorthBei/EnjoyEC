require("../_general/general.js");
require("../_general/member_section/member_section.js");

window.addEventListener("load",function(){

    $('#all_product').click(function(event) {
        $('.want_return').prop('checked',this.checked);
    });

    $('.want_return').click(function(){
        if(!this.checked){
            $('#all_product').prop('checked',false);
        }
    });

    $('.input_count').on("change",function(){
        var max = parseInt($(this).attr("max"));
        var val = parseInt($(this).val());
        var isMax = (val> max)? true : false;
        
        if(isMax){
            $(this).val(max);
        }
        var isCheck = $(this).closest('.t_row').find(".want_return").prop('checked');
        
        if(isCheck){
            calcAllProduct();
        }
    });

    $('.want_return').on("change",function(){
        //var isCheck = $(this).prop('checked');
        //var number = $(this).parent().parent().parent().parent().find(".input_count");
        //var calc = parseInt(number.val())*parseInt(number.attr("data-price"));
        calcAllProduct();
    });

    $("#all_product").on("change",calcAllProduct);

    $(".select_return_reason").change(function(){
        var selected = $(':selected', this);
        var label = selected.closest('optgroup').attr('label');

        var isCheck = $(this).closest('.t_row').find(".want_return").prop('checked');
        if(isCheck){
            calcAllProduct();
        }
        
        var parent = $(this).parent();
        var hasInputOther = (parent.has(".input_other").length != 0);

        if(selected.val() == "其他"){
            var input_other = $('<input type="text" class="input_other" placeholder="請填寫退貨原因"/>');
            if(!hasInputOther){
                parent.append(input_other);
                $(this).closest(".t_row").addClass("have_comment");
            }
        }
        else{
            if(hasInputOther){
                parent.find(".input_other").remove();
            }
            $(this).closest(".t_row").removeClass("have_comment");
        }
        
    });
    
    $(".dialog_button_wrapper .next").click(function(event){
        event.preventDefault();
        if($("#user_check_know:checked").length > 0){
            var return_note = prepareArugment();
            if(return_note == ""){
                return;
            }
            else{
                $(".dialog_button_wrapper input[name=return_note]").val(return_note);
            }

            $(this).closest("form").submit();
        }
    });
});

function calcAllProduct(){
    var total = 0;
    var hasDefective = 0;
    $('.t_row').each(function(){
        var isCheck = $(this).find(".want_return").prop('checked');
        
        if(isCheck){
            var counter = $(this).find(".input_count")
            var max = parseInt(counter.attr("max"));
            var val = parseInt(counter.val());
            var isMax = (val> max)? true : false;
            
            if(isMax){
                $(this).val(max);
            }
            total += val*parseInt(counter.attr("data-price"));
            
            var label = $(this).find('.select_return_reason :selected').closest("optgroup").attr("label");
            
            if(label == "瑕疵品"){
                hasDefective++;
                var ele = $("#retrun_shipping_fee");
                var fee = ele.attr("data-fee");
                ele.text(fee);
            }
            
        }
    });

    if(total<0){
        total = 0;
    }
    $("#count_price").text(total);
    // total-=parseInt($("#discount").text());
    if(hasDefective <= 0){
        //如果沒有瑕疵品就歸零
        $("#retrun_shipping_fee").text(0);
        $(".dialog_button_wrapper input[name=is_defective]").val(false);
    }
    else{
        //有瑕疵品就要算補貼運費
        total+=parseInt($("#retrun_shipping_fee").text());
        $(".dialog_button_wrapper input[name=is_defective]").val(true);
    }
    
    $("#refund_total").text(total);
}

function prepareArugment(){
    var return_note = ""
    $('.t_row').each(function(){
        var isCheck = $(this).find(".want_return").prop('checked');
        
        //ex “如膠似漆2.0系列 ,退貨數量:2,退貨原因:買錯;”
        
        if(isCheck){
            return_note+=$(this).find(".prodct_text_wrapper>a").text().trim()+",";

            var counter = $(this).find(".input_count")
            var max = parseInt(counter.attr("max"));
            var val = parseInt(counter.val());
            var number = (val> max)? max : val;
            
            return_note+="退貨數量:"+number+","
            
            var reason = $(this).find('.select_return_reason :selected').text();
            
            if(reason == "其他"){
                reason = $(this).find('.input_other').val();
            }
            return_note+="退貨原因:"+reason+";"
        }
    });
    //console.log(return_note);
    return return_note;
}