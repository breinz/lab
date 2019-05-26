import { Request, Response, NextFunction } from "express";

import ProjectValidator from "../validator/projectValidator";
import Project, { ProjectModel } from "../model/projectModel";
import Techno from "../model/technoModel";

export default class ProjectMiddleware {

    async validCreate(req: Request, res: Response, next: NextFunction) {
        const validator = new ProjectValidator(req.body);

        if (!validator.validCreate()) {
            return res.render("admin/project/new", {
                project: req.body,
                errors: validator.errors,
                technos: await Techno.find()
            });
        }

        next();
    }

    async validEdit(req: Request, res: Response, next: NextFunction) {
        const validator = new ProjectValidator(req.body);

        if (!validator.validCreate()) {
            return res.render("admin/project/edit", {
                project: req.body,
                errors: validator.errors,
                technos: await Techno.find()
            });
        }

        next();
    }

    async findProject(req: Request, res: Response, next: NextFunction) {

        req.project = await Project.findById(req.params.id) as ProjectModel;

        next();
    }
}