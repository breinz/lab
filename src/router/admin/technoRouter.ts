import express from "express";

import controllers from "../../controller"
import middlewares from "../../middleware";

const router = express.Router();

const controller = controllers.admin.technos;
const middleware = middlewares.admin.techno;
const imageMiddleware = middlewares.image;

router.get('/', controller.getIndex);
router.get("/new", controller.getNew);
router.post("/new", imageMiddleware.uploadSingle, middleware.validNew, controller.create);
router.get("/:id/edit", middleware.findTechno, controller.getEdit);
router.post("/:id/edit", imageMiddleware.uploadSingle, middleware.findTechno, controller.edit);
router.post("/:id/delete", middleware.findTechno, imageMiddleware.removeTechnoImages, controller.doDelete);

export default router;
