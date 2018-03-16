//需要在首頁加入這些東西～ gulp compile的時候 img src的path會被置換掉
$('.slick_slide').slick({
    dots: true,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow:'<img src="./wp-content/themes/EnjoyEC/home/asset/Circled-Chevron-Left.png" id="slick-prev" class="slick-arrow">',
    nextArrow:'<img src="./wp-content/themes/EnjoyEC/home/asset/Circled-Chevron-Right.png" id="slick-next" class="slick-arrow">'
});