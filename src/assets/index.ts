import $ from 'jquery';
import "bootstrap"

// Delete modal
$(".delete_link").click(function (event) {
    $("#delete_modal_form").attr("action", $(this).attr("data-href") as string);
});

$(".img-checkbox").click(function () {
    $(this).toggleClass("selected");
    const checkbox = $(this).children("input[type='checkbox']");
    checkbox.prop("checked", !checkbox.prop("checked"));
});
