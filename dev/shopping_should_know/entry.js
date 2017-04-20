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
});
