"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var projectController_1 = __importDefault(require("../../controller/admin/projectController"));
var middleware_1 = require("../../middleware");
var router = express_1.default.Router();
var controller = new projectController_1.default();
router.get("/", controller.index);
router.get("/new", controller.getNew);
router.post("/new", middleware_1.projectMiddleware.validCreate, controller.create);
router.post("/:id/delete", middleware_1.projectMiddleware.findProject, controller.doDelete);
exports.default = router;
