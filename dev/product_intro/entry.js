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
});