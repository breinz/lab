import { Request, Response } from "express";
import User, { UserModel } from "../model/userModel";

export default class FrontController {

    /**
     * GET /
     * @param req 
     * @param res 
     */
    public index(req: Request, res: Response) {
        res.render("index");

    }

    /**
     * GET /login
     * @param req 
     * @param res 
     */
    public getLogin(req: Request, res: Response) {
        res.render("login");
    }

    /**
     * POST /login
     * @param req 
     * @param res 
     */
    public async login(req: Request, res: Response) {
        const user = await User.findOne({ email: req.body.email }) as UserModel;

        res.cookie("uid", user.id, { maxAge: 1000 * 60 * 60 * 24 * 30 });

        req.flash("success", "Login success");

        res.redirect("/");
    }

    /**
     * Logout
     * @param req 
     * @param res 
     */
    logout(req: Request, res: Response) {
        res.clearCookie("uid");

        req.flash("success", "Logout success");

        res.redirect("/");
    }

    /**
     * GET /signin
     * @param req 
     * @param res 
     */
    public getSignin(req: Request, res: Response) {
        res.render("signin")
    }
    /**
     * POST /signin
     * @param req 
     * @param res 
     */
    public async signin(req: Request, res: Response) {
        await User.create(req.body);

        req.flash("success", `Signed in successfully. Welcome ${req.body.name}!`)

        res.redirect("/");
    }
}