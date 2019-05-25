import { Request, Response, NextFunction } from "express";
import ProjectValidator from "../validator/projectValidator";
import Project, { ProjectModel } from "../model/projectModel";

export default class ProjectMiddleware {

    validCreate(req: Request, res: Response, next: NextFunction) {
        const validator = new ProjectValidator(req.body);

        if (!validator.validCreate()) {
            return res.render("admin/project/new", {
                data: req.body,
                errors: validator.errors
            });
        }

        next();
    }

    async findProject(req: Request, res: Response, next: NextFunction) {

        req.project = await Project.findById(req.params.id) as ProjectModel;

        next();
    }
}