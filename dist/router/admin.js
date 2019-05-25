"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var admin_1 = __importDefault(require("../controller/admin"));
var middleware_1 = require("../middleware");
var adminController = new admin_1.default();
var router = express_1.default.Router();
router.get("/", middleware_1.userMiddleware.loginShield, adminController.index);
exports.default = router;
