import $ from 'jquery';
import "bootstrap"

// Delete modal
$("#delete_link").click(function (event) {
    $("#delete_modal_form").attr("action", $(this).attr("data-href") as string);
});
