"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var express_session_1 = __importDefault(require("express-session"));
var router_1 = __importDefault(require("./router"));
var middleware_1 = require("./middleware");
var config_1 = __importDefault(require("./config"));
var app = express_1.default();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(cookie_parser_1.default());
app.use(express_session_1.default({
    secret: "blahpomblah",
    cookie: {
        maxAge: 1000 * 60
    },
    resave: true
}));
app.use(express_1.default.static("dist/assets"));
app.set("view engine", "pug");
app.set('views', path_1.default.join(__dirname, '../src/views'));
app.use(middleware_1.flashMiddleware.init);
app.use(middleware_1.userMiddleware.getCurrentUser);
app.use("/", router_1.default.front);
app.use("/admin", router_1.default.admin.admin);
app.listen(config_1.default.PORT, "0.0.0.0", function () {
    console.log("App running");
});
exports.default = app;
