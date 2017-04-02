require("../_general/general.js");
$(document).ready(function(){
    $('#product_photo_list').slick({
        vertical: true,
        slidesToShow: 5,
        slidesToScroll: 5,
        infinite: false,
        prevArrow:'<i class="slide_arrow fa fa-caret-up" aria-hidden="true"></i>',
        nextArrow:'<i class="slide_arrow fa fa-caret-down" aria-hidden="true"></i>'
    });
});