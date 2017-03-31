//window.jQuery = require("../_general/general_entry.js");
require("../_general/third_part/slick-1.6.0/slick/slick.min.js");
require("../_general/general.js");
$(document).ready(function(){
    $('.slick_slide').slick({
        dots: true,
        prevArrow:'<img src="./asset/Circled-Chevron-Left.png" id="slick-prev" class="slick-arrow">',
        nextArrow:'<img src="./asset/Circled-Chevron-Right.png" id="slick-next" class="slick-arrow">'
    });
});