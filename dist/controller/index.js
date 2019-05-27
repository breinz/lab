"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var technosController_1 = __importDefault(require("./admin/technosController"));
var projectController_1 = __importDefault(require("./admin/projectController"));
exports.default = {
    admin: {
        project: new projectController_1.default(),
        technos: new technosController_1.default()
    }
};
