require("../_general/general.js");

window.addEventListener("load",function(){

    $('#all_product').click(function(event) {
        $('.want_return').attr('checked',this.checked);
    });
});