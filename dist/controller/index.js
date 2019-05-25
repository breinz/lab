"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var technosController_1 = __importDefault(require("./admin/technosController"));
exports.default = {
    admin: {
        technos: new technosController_1.default()
    }
};
