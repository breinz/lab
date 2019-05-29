import TechnoMiddleware from "../technoMiddleware"
import Techno from "../../model/technoModel";
import TechnoData from "../../model/test/technoData";
var mongoose = require("mongoose");

describe("TechnoMiddleware", () => {

    describe("findAll", () => {
        test("should populate req.technos and call next", async () => {
            const techno = await Techno.create(new TechnoData().valid());

            const middleware = new TechnoMiddleware();

            const req: any = {
                technos: []
            };

            const res: any = {};

            const next: any = jest.fn();

            await middleware.findAll(req, res, next);

            expect(next).toHaveBeenCalled();

            // TODO: If another techno is created in the meantime, this expectation will fail
            expect(req.technos[req.technos.length - 1].id).toBe(techno.id)
        })
    })

    describe("findTechno", () => {
        test("should populate req.techno and call next with a valid techno id", async () => {
            const techno = await Techno.create(new TechnoData().valid());

            const middleware = new TechnoMiddleware();

            const req: any = {
                params: {
                    id: techno.id
                },
                flash: jest.fn()
            };

            const res: any = {
                redirect: jest.fn()
            };

            const next: any = jest.fn();

            await middleware.findTechno(req, res, next);

            expect(next).toHaveBeenCalled();
            expect(req.techno.id).toBe(techno.id);

            expect(req.flash).not.toHaveBeenCalled();
            expect(res.redirect).not.toHaveBeenCalled();
        })

        test("should populate flash and redirect with invalid id", async () => {
            const techno_id = new mongoose.Types.ObjectId();

            const middleware = new TechnoMiddleware();

            const req: any = {
                params: {
                    id: techno_id
                },
                flash: jest.fn()
            };

            const res: any = {
                redirect: jest.fn()
            };

            const next: any = jest.fn();

            await middleware.findTechno(req, res, next);

            expect(req.flash).toHaveBeenCalledWith("error", "Techno not found");
            expect(res.redirect).toHaveBeenCalledWith("/admin/technos");

            expect(next).not.toHaveBeenCalled();
            expect(req.techno).toBeFalsy();
        })
    })

    describe("validNew", () => {
        test("should call next with valid data", () => {
            const middleware = new TechnoMiddleware();

            const req: any = {
                body: new TechnoData().valid()
            };

            const res: any = {
                render: jest.fn()
            };

            const next: any = jest.fn();

            middleware.validNew(req, res, next);

            expect(next).toHaveBeenCalled();
            expect(res.render).not.toHaveBeenCalled();
        })

        test("should call res.render with invalid data", () => {
            const middleware = new TechnoMiddleware();

            const req: any = {
                body: null
            };

            const res: any = {
                render: jest.fn()
            };

            const next: any = jest.fn();

            middleware.validNew(req, res, next);

            expect(next).not.toHaveBeenCalled();
            expect(res.render).toHaveBeenCalledWith("admin/techno/new", {
                data: req.body,
                errors: expect.any(Object)
            });
        })
    })
})