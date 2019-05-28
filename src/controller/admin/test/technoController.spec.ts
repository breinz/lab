import TechnosController from "../technosController";
import TechnoData from "../../../model/test/technoData"
import Techno, { TechnoModel } from "../../../model/technoModel";

describe("TechnosController", () => {

    describe("getIndex", () => {

        test("should render index", async () => {
            const controller = new TechnosController();

            const req: any = {};

            const res: any = {
                render: jest.fn(),

            };

            await controller.getIndex(req, res);

            expect(res.render).toHaveBeenCalledWith("admin/techno/index", { technos: expect.any(Array) });
        })
    })

    describe("getNew", () => {
        test("should render new", () => {
            const controller = new TechnosController();

            const req: any = {};

            const res: any = {
                render: jest.fn(),
            };

            controller.getNew(req, res);

            expect(res.render).toHaveBeenCalledWith("admin/techno/new");
        })
    })

    describe("create", () => {
        test("should create techno, populate flash and redirect", async () => {
            const data = new TechnoData().valid();
            const controller = new TechnosController();

            const req: any = {
                body: data,
                flash: jest.fn()
            };

            const res: any = {

                redirect: jest.fn()
            };

            await controller.create(req, res);

            expect(res.redirect).toHaveBeenCalledWith("/admin/technos");
            expect(req.flash).toHaveBeenCalledWith("success", "Techno created");

            const techno = await Techno.find({ name: data.name });
            expect(techno).not.toBeFalsy();
        })
    })

    describe("getEdit", () => {
        test("should render edit", async () => {
            const techno = await Techno.create(new TechnoData().valid());

            const req: any = {
                techno: techno
            };

            const res: any = {
                render: jest.fn(),

            };

            const controller = new TechnosController();

            controller.getEdit(req, res);

            expect(res.render).toHaveBeenCalledWith("admin/techno/edit", { techno: techno });
        })
    })

    describe("edit", () => {
        test("should edit techno, populate flash and redirect", async () => {
            const techno = await Techno.create(new TechnoData().valid()) as TechnoModel;

            const newData = new TechnoData().valid()

            const controller = new TechnosController();

            const req: any = {
                techno: techno,
                body: newData,
                flash: jest.fn()
            };

            const res: any = {

                redirect: jest.fn()
            };

            await controller.edit(req, res);

            expect(res.redirect).toHaveBeenCalledWith("/admin/technos");
            expect(req.flash).toHaveBeenCalledWith("success", `${techno.name} edited`);

            const newTechno = await Techno.findById(techno.id) as TechnoModel;

            expect(newTechno.name).toBe(newData.name);
        })
    })

    describe("delete", () => {
        test("should delete techno, populate flash and redirect", async () => {
            const techno = await Techno.create(new TechnoData().valid()) as TechnoModel;

            const controller = new TechnosController();

            const req: any = {
                techno: techno,
                flash: jest.fn()
            };

            const res: any = {
                redirect: jest.fn()
            };

            await controller.doDelete(req, res);

            expect(res.redirect).toHaveBeenCalledWith("/admin/technos");
            expect(req.flash).toHaveBeenCalledWith("success", `Techno ${techno.name} removed`);

            const deletedTechno = await Techno.findById(techno.id) as TechnoModel;

            expect(deletedTechno).toBeFalsy();

        })
    })
})