"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = __importDefault(require("./user"));
var flash_1 = __importDefault(require("./flash"));
var projectMiddleware_1 = __importDefault(require("./projectMiddleware"));
var technoMiddleware_1 = __importDefault(require("./technoMiddleware"));
exports.userMiddleware = new user_1.default();
exports.flashMiddleware = new flash_1.default();
exports.projectMiddleware = new projectMiddleware_1.default();
exports.default = {
    admin: {
        techno: new technoMiddleware_1.default()
    }
};
