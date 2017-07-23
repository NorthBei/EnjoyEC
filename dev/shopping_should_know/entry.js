require("../_general/general.js");
require("../_general/member_section/member_section.js");

window.addEventListener("load",function(){
    $(".qa_title").click(function () {

        var $title = $(this);
        $title.toggleClass("qa_title_active");
        //getting the next element
        $content = $title.next();
        //open up the content needed - toggle the slide- if visible, slide up, if not slidedown.
        $content.slideToggle(300, function () {
            //execute this after slideToggle is done
            //change text of header based on visibility of content div
            //$title.find(".expand_state");
            // text(function () {
            //     //change text based on condition
            //     return $content.is(":visible") ? "Collapse" : "Expand";
            // });
        });

    });

    var preSelectCat = $(".side_bar li").first();
    var preSelectID = $(".side_bar li").find("a").attr("href");
    $(".side_bar li").click(function(event){
        event.preventDefault();
        if(preSelectID == id){
            return;
        }
        console.log(preSelectCat);
        console.log(preSelectID);
        var id = $(this).find("a").attr("href");
        preSelectCat.removeClass("active");
        $(this).addClass("active");
        preSelectCat = $(this);
        if(id == undefined){
            return;
        }
        $(preSelectID).hide();
        $(id).show();
        preSelectID = id;
    });
});
