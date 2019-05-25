import { Request, Response } from "express";
import Project from "../../model/projectModel";

export default class AdminProjectController {

    async index(req: Request, res: Response) {
        const projects = await Project.find();

        res.render("admin/project/index", {
            projects: projects
        })
    }

    getNew(req: Request, res: Response) {
        res.render("admin/project/new");
    }

    async create(req: Request, res: Response) {
        await Project.create(req.body);

        req.flash("success", "Project created");

        res.redirect("/admin/projects");
    }

    async doDelete(req: Request, res: Response) {
        await req.project.remove();

        req.flash("success", `Project ${req.project.title} deleted`)
        res.redirect("/admin/projects")
    }
}