"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var faker_1 = __importDefault(require("faker"));
var ProjectData = (function () {
    function ProjectData() {
    }
    ProjectData.prototype.valid = function () {
        return {
            title: faker_1.default.lorem.word()
        };
    };
    return ProjectData;
}());
exports.default = ProjectData;
