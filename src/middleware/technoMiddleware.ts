import { Request, Response, NextFunction } from "express";
import validators from "../validator"
import Techno, { TechnoModel } from "../model/technoModel";

export default class TechnoMiddleware {

    async findAll(req: Request, res: Response, next: NextFunction) {
        req.technos = await Techno.find() as [TechnoModel];
        next();
    }

    async findTechno(req: Request, res: Response, next: NextFunction) {
        req.techno = await Techno.findById(req.params.id) as TechnoModel;

        if (!req.techno) {
            req.flash("error", "Techno not found");

            return res.redirect("/admin/technos")
        }

        next();
    }

    validNew(req: Request, res: Response, next: NextFunction) {
        const validator = new validators.techno(req.body);

        if (!validator.validNew()) {
            return res.render("admin/techno/new", {
                data: req.body,
                errors: validator.errors
            })
        }

        next();

    }
}