import { Request, Response } from "express";

import Techno, { TechnoModel } from "../../model/technoModel";

export default class TechnosController {

    async getIndex(req: Request, res: Response) {
        const technos = await Techno.find() as [TechnoModel];

        res.render("admin/techno/index", { technos: technos })
    }

    getNew(req: Request, res: Response) {
        res.render("admin/techno/new")
    }

    async create(req: Request, res: Response) {
        await Techno.create(req.body);

        req.flash("success", "Techno created");

        res.redirect("/admin/technos");
    }

    getEdit(req: Request, res: Response) {
        res.render("admin/techno/edit", {
            techno: req.techno
        });
    }

    async edit(req: Request, res: Response) {
        Object.assign(req.techno, req.body);

        await req.techno.save();

        req.flash("success", `${req.techno.name} edited`)

        res.redirect("/admin/technos");
    }

    async doDelete(req: Request, res: Response) {
        await req.techno.remove();

        req.flash("success", `Techno ${req.techno.name} removed`)

        res.redirect("/admin/technos")
    }
}