"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ProjectValidator = (function () {
    function ProjectValidator(data) {
        this.data = data;
        this.errors = {};
    }
    ProjectValidator.prototype.validCreate = function () {
        this.validTitle();
        return Object.keys(this.errors).length === 0;
    };
    ProjectValidator.prototype.validTitle = function () {
        if (this.data.title.length === 0) {
            this.errors.title = "Required";
        }
    };
    return ProjectValidator;
}());
exports.default = ProjectValidator;
