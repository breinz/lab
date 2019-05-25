import express from "express"

import FrontController from "../controller/front"
import UserMiddleware from "../middleware/user"

const frontController = new FrontController();
const userMiddleware = new UserMiddleware();

const router = express.Router();

router.get("/", frontController.index);
router.get("/signin", frontController.getSignin);
router.post("/signin", userMiddleware.validSignin, frontController.signin);
router.get("/login", frontController.getLogin);
router.post("/login", userMiddleware.validLogin, frontController.login);
router.get("/logout", frontController.logout);

export default router