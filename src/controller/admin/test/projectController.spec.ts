import controllers from "../../";
import ProjectData from "../../../model/test/projectData"
import Project, { ProjectModel } from "../../../model/projectModel";

describe("AdminProjectController", () => {

    describe("index", () => {

        test("should call render", async () => {

            const controller = controllers.admin.project;

            const req: any = {};

            const res: any = {
                render: jest.fn(),

            };

            await controller.index(req, res);

            expect(res.render).toHaveBeenCalledWith("admin/project/index", expect.any(Object));
        })
    })

    describe("getNew", () => {
        test("should call render", () => {
            const controller = controllers.admin.project;

            const req: any = {
                technos: {}
            };

            const res: any = {
                render: jest.fn(),
            };

            controller.getNew(req, res);

            expect(res.render).toHaveBeenCalledWith("admin/project/new", { technos: req.technos });
        })
    })

    describe("create", () => {
        test("should create a project, populate flash and redirect", async () => {
            const controller = controllers.admin.project;

            const req: any = {
                flash: jest.fn(),
                body: new ProjectData().valid()
            };

            const res: any = {
                redirect: jest.fn()
            };

            await controller.create(req, res);

            expect(req.flash).toHaveBeenCalledWith("success", "Project created")
            expect(res.redirect).toHaveBeenCalledWith("/admin/projects")

        })
    })

    describe("getEdit", () => {
        test("should render edit", () => {
            const controller = controllers.admin.project;

            const req: any = {
                project: new ProjectData().valid(),
                technos: {}
            };

            const res: any = {
                render: jest.fn(),
            };

            controller.getEdit(req, res);

            expect(res.render).toHaveBeenCalledWith("admin/project/edit", {
                project: req.project,
                technos: req.technos
            });
        })
    })

    describe("edit", () => {
        test("should edit the project, populate flash and redirect", async () => {
            const newData = new ProjectData().valid();
            const project = await Project.create(new ProjectData().valid());
            const controller = controllers.admin.project;

            const req: any = {
                project: project,
                body: newData,
                flash: jest.fn()
            };

            const res: any = {
                redirect: jest.fn()
            };

            await controller.edit(req, res);

            expect(req.flash).toHaveBeenCalledWith("success", `${newData.title} updated`);
            expect(res.redirect).toHaveBeenCalledWith("/admin/projects")

            const newProject = await Project.findById(project.id) as ProjectModel;

            expect(newProject.title).toBe(newData.title);

        })
    })

    describe("doDelete", () => {
        test("should remove the project, populate flash and redirect", async () => {
            const project = await Project.create(new ProjectData().valid()) as ProjectModel;

            const controller = controllers.admin.project;

            const req: any = {
                project: project,
                flash: jest.fn()
            };

            const res: any = {
                redirect: jest.fn()
            };

            await controller.doDelete(req, res);

            expect(req.flash).toHaveBeenCalledWith("success", `Project ${project.title} deleted`);
            expect(res.redirect).toHaveBeenCalledWith("/admin/projects");

            const deletedProject = await Project.findById(project.id);

            expect(deletedProject).toBeFalsy();

        })
    })
})