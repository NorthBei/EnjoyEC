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
});