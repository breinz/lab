"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var projectController_1 = __importDefault(require("../../controller/admin/projectController"));
var middleware_1 = __importDefault(require("../../middleware"));
var router = express_1.default.Router();
var controller = new projectController_1.default();
var middleware = middleware_1.default.admin.project;
var technoMiddleware = middleware_1.default.admin.techno;
router.get("/", controller.index);
router.get("/new", technoMiddleware.findAll, controller.getNew);
router.post("/new", middleware.validCreate, controller.create);
router.get("/:id/edit", middleware.findProject, technoMiddleware.findAll, controller.getEdit);
router.post("/:id/edit", middleware.findProject, middleware.validEdit, controller.edit);
router.post("/:id/delete", middleware.findProject, controller.doDelete);
exports.default = router;
