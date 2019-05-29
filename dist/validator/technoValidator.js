"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ProjectValidator = (function () {
    function ProjectValidator(data) {
        this.errors = {};
        this.data = data;
    }
    ProjectValidator.prototype.validNew = function () {
        this.validName();
        return Object.keys(this.errors).length === 0;
    };
    ProjectValidator.prototype.validName = function () {
        if (!this.data || !this.data.name || this.data.name.length === 0) {
            this.errors.name = "Required";
        }
    };
    return ProjectValidator;
}());
exports.default = ProjectValidator;
