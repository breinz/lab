"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var controller_1 = __importDefault(require("../../controller"));
var middleware_1 = __importDefault(require("../../middleware"));
var router = express_1.default.Router();
var controller = controller_1.default.admin.technos;
var middleware = middleware_1.default.admin.techno;
router.get('/', controller.getIndex);
router.get("/new", controller.getNew);
router.post("/new", middleware.validNew, controller.create);
router.get("/:id/edit", middleware.findTechno, controller.getEdit);
router.post("/:id/edit", middleware.findTechno, controller.edit);
router.post("/:id/delete", middleware.findTechno, controller.doDelete);
exports.default = router;
