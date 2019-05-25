"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TechnoValidator = (function () {
    function TechnoValidator(data) {
        this.errors = {};
        this.data = data;
    }
    TechnoValidator.prototype.validNew = function () {
        this.validName();
        return Object.keys(this.errors).length === 0;
    };
    TechnoValidator.prototype.validName = function () {
        if (this.data.name.length === 0) {
            this.errors.name = "Required";
        }
    };
    return TechnoValidator;
}());
exports.default = TechnoValidator;
