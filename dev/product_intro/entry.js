require("../_general/general.js");

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
        console.log(e.target.classList);
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
        console.log(min,num,max);
        if((num+i) <= max && (num+i)>=min){
            content.text(num+i);
        }
        
    });
});