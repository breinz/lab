"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var faker_1 = __importDefault(require("faker"));
var PeojectData = (function () {
    function PeojectData() {
    }
    PeojectData.prototype.valid = function () {
        return {
            name: faker_1.default.lorem.word()
        };
    };
    return PeojectData;
}());
exports.default = PeojectData;
