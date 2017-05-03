require("../_general/filter/filter.js");

window.addEventListener("load",function(){
    $(".category_parent").click(function () {

        var $parent = $(this);

        $parent.parent().toggleClass("category_list_active");
        
        $child = $parent.next();
        
        $child.slideToggle(300, function () {
            
        });

    });
});