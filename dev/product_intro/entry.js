require("../_general/general.js");
require("../_general/filter/filter.js");

$(document).ready(function(){
    $('#product_photo_list').slick({
        vertical: true,
        slidesToShow: 5,
        slidesToScroll: 5,
        infinite: false,
        verticalSwiping:true,
        prevArrow:'<i id="prevArrow"></i>',
        nextArrow:'<i id="nextArrow"></i>'
    });
    
    var list = document.querySelector('#product_photo_list');

    $('#product_photo_list img').click(function(){
        var link = $(this).attr("data-url");
        if(link != undefined){
            $("#product_photo").attr("src",link).attr("srcset",link);
        }
    });


    var scrollBottom = true;
    list.addEventListener('click', function (e) {
        
        if(e.target.id != "product_photo_list"){
            return;
        }
        if(scrollBottom){
            $("#nextArrow").trigger("click");
        }
        else{
            $("#prevArrow").trigger("click");
        }
        scrollBottom = !scrollBottom;
        //console.log(e.target.classList);
        e.target.classList.toggle("scrollBottom"); 
        
    });

    $(".num_arrow").click(function(){
        var i = 0;
        if($(this).hasClass("num_arrow_left")){
            i+=1;
        }
        else{
            i-=1;
        }
        var content = $(".number_content");
        var num = parseInt(content.text());
        var min = content.attr("min");
        var max = content.attr("max");
        //console.log(min,num,max);
        if((num+i) <= max && (num+i)>=min){
            content.text(num+i);
        }
        
    });

    $("#add_favorite").click(function(){
        var fa = $(this).find(".fa");
        var action_do = "";

        if(fa.hasClass("fa-heart-o")){
            action_do = "add";
        }
        else if(fa.hasClass("fa-heart")){
            action_do = "delete";
        }
        else{
            console.log("fa class error");
            return;
        }
        console.log(action_do);
        
		var product_id = $("#product_id").val();
		//參數 新增商品進入收藏清單的話 
		//action_do = 'add'
		//product_id ='商品id'
		//狀態
		//array("status"=>true, "message"=>'it successful to update.');	
		//array("status"=>false, "message"=>'it has existed.');		
		
		//參數 移除收藏清單之商品
		//action_do = 'delete'
		//product_id ='商品id'
		//狀態
		//array("status"=>true, "message"=>'it is successful to delete.');
		//array("status"=>false, "message"=>"it's illegal !");	
		
        $.ajax({
            type: "POST",
            url: ajaxurl,
			dataType: 'json',
            data: {
                "action":"favorite_list",
				"action_do":action_do,
				"product_id":product_id,
			},
            success: function(msg){
				 console.log(msg)
                if(msg[0]["status"]){
 					console.log(msg)
                    if(action_do == "add"){
                        fa.removeClass("fa-heart-o");
                        fa.addClass("fa-heart");
                    }
                    else if(action_do == "delete"){
                        fa.removeClass("fa-heart");
                        fa.addClass("fa-heart-o");
                    }
                }
                else{			
                    console.log("error");
                }
                
            }   
        });
    });

});