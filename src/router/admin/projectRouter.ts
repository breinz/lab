import express from "express";
import AdminProjectController from "../../controller/admin/projectController";
import { projectMiddleware } from "../../middleware";


const router = express.Router();

const controller = new AdminProjectController();

router.get("/", controller.index);
router.get("/new", controller.getNew);
router.post("/new", projectMiddleware.validCreate, controller.create);
router.post("/:id/delete", projectMiddleware.findProject, controller.doDelete);

export default router;