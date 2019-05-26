"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var userModel_1 = __importDefault(require("./userModel"));
var projectModel_1 = __importDefault(require("./projectModel"));
var technoModel_1 = __importDefault(require("./technoModel"));
exports.default = {
    User: userModel_1.default,
    Project: projectModel_1.default,
    Techno: technoModel_1.default
};
