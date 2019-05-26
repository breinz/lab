import express from "express";
import AdminProjectController from "../../controller/admin/projectController";
import middlewares from "../../middleware"

const router = express.Router();

const controller = new AdminProjectController();
const middleware = middlewares.admin.project;
const technoMiddleware = middlewares.admin.techno;

router.get("/", controller.index);
router.get("/new", technoMiddleware.findAll, controller.getNew);
router.post("/new", middleware.validCreate, controller.create);
router.get("/:id/edit", middleware.findProject, technoMiddleware.findAll, controller.getEdit);
router.post("/:id/edit", middleware.findProject, middleware.validEdit, controller.edit);
router.post("/:id/delete", middleware.findProject, controller.doDelete);

export default router;