import express from "express"

import AdminController from "../controller/admin"
import { userMiddleware } from "../middleware"
import technosRouter from "./admin/technoRouter"
import projectsRouter from "./admin/projectRouter"

const adminController = new AdminController();

const router = express.Router();

router.use(userMiddleware.loginShield);

router.use((req, res, next) => {
    res.locals.menu_item = "admin";
    next();
})


router.get("/", adminController.index);
router.use("/projects", projectsRouter)
router.use("/technos", technosRouter);


export default router