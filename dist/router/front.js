"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var front_1 = __importDefault(require("../controller/front"));
var user_1 = __importDefault(require("../middleware/user"));
var frontController = new front_1.default();
var userMiddleware = new user_1.default();
var router = express_1.default.Router();
router.get("/", frontController.index);
router.get("/signin", frontController.getSignin);
router.post("/signin", userMiddleware.validSignin, frontController.signin);
router.get("/login", frontController.getLogin);
router.post("/login", userMiddleware.validLogin, frontController.login);
router.get("/logout", frontController.logout);
exports.default = router;
