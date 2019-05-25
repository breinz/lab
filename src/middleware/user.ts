import { Request, Response, NextFunction } from "express";

import UserValidator from "../validator/user";
import User, { UserModel } from "../model/userModel";

export default class UserMiddleware {

    /**
     * Makes sure a user is logged in
     * TODO: Save path in a cookie to get there after login
     * @param req 
     * @param res
     * @param next
     */
    public loginShield(req: Request, res: Response, next: NextFunction) {
        if (!req.current_user) {
            return res.redirect("/login");
        }

        next();
    }

    /**
     * Adds the logged in user to req & res
     * @param req 
     * @param res 
     * @param next 
     */
    public async getCurrentUser(req: Request, res: Response, next: NextFunction) {
        if (req.cookies.uid) {
            const user = await User.findById(req.cookies.uid) as UserModel;

            if (user) {
                res.locals.current_user = user;
                req.current_user = user;
            }
        }

        next();
    }

    /**
     * Valid login form
     * @param req 
     * @param res 
     * @param next 
     */
    public async validLogin(req: Request, res: Response, next: NextFunction) {
        const validator = new UserValidator(req.body);

        if (!await validator.isValidForLogin()) {
            return res.render("login", { data: req.body, error: true });
        }

        next();
    }

    /**
     * Valid signin form
     * @param req 
     * @param res 
     * @param next 
     */
    public async validSignin(req: Request, res: Response, next: NextFunction) {
        const validator = new UserValidator(req.body);

        if (!await validator.isValidForSignin()) {
            return res.render("signin", { data: req.body, errors: validator.errors });
        }

        next();
    }
}