import { Request, Response } from "express";

export default class AdminController {

    public index(req: Request, res: Response) {
        res.render("admin/index");

    }
}