"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var faker_1 = __importDefault(require("faker"));
var TechnoData = (function () {
    function TechnoData() {
    }
    TechnoData.prototype.valid = function () {
        return {
            name: faker_1.default.lorem.word()
        };
    };
    return TechnoData;
}());
exports.default = TechnoData;
