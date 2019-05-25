import express from "express"
import path from "path"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import session from "express-session"

import routers from "./router"
import { userMiddleware, flashMiddleware } from "./middleware"
import config from "./config";

let app = express()

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Cookie parser
app.use(cookieParser());
app.use(session({
    secret: "blahpomblah",
    cookie: {
        maxAge: 1000 * 60
    },
    resave: true
}));

// Static content
app.use(express.static("dist/assets"));

// View engine
app.set("view engine", "pug")
app.set('views', path.join(__dirname, '../src/views'));

// Initialize flash
app.use(flashMiddleware.init);

// Check for a logged in user (populates req.current_user & res.locals.current_user)
app.use(userMiddleware.getCurrentUser);

// Route
app.use("/", routers.front);
app.use("/admin", routers.admin.admin);

// Start server
app.listen(config.PORT, "0.0.0.0", () => {
    console.log("App running")
})


export default app;