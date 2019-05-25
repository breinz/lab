"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var adminRouter_1 = __importDefault(require("./adminRouter"));
var front_1 = __importDefault(require("./front"));
var projectRouter_1 = __importDefault(require("./admin/projectRouter"));
var technoRouter_1 = __importDefault(require("./admin/technoRouter"));
exports.default = {
    front: front_1.default,
    admin: {
        admin: adminRouter_1.default,
        projects: projectRouter_1.default,
        technos: technoRouter_1.default
    }
};
