"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var admin_1 = __importDefault(require("../controller/admin"));
var middleware_1 = require("../middleware");
var technoRouter_1 = __importDefault(require("./admin/technoRouter"));
var projectRouter_1 = __importDefault(require("./admin/projectRouter"));
var adminController = new admin_1.default();
var router = express_1.default.Router();
router.use(middleware_1.userMiddleware.loginShield);
router.use(function (req, res, next) {
    res.locals.menu_item = "admin";
    next();
});
router.get("/", adminController.index);
router.use("/projects", projectRouter_1.default);
router.use("/technos", technoRouter_1.default);
exports.default = router;
