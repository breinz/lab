"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jquery_1 = __importDefault(require("jquery"));
require("bootstrap");
jquery_1.default(".delete_link").click(function (event) {
    jquery_1.default("#delete_modal_form").attr("action", jquery_1.default(this).attr("data-href"));
});
jquery_1.default(".img-checkbox").click(function () {
    jquery_1.default(this).toggleClass("selected");
    var checkbox = jquery_1.default(this).children("input[type='checkbox']");
    checkbox.prop("checked", !checkbox.prop("checked"));
});
