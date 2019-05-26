
import middlewares from "../"
import ProjectData from "../../model/test/projectData";
import Project, { ProjectModel } from "../../model/projectModel";

describe("ProjectMiddleware", () => {

    describe("validCreate", () => {

        test("should call next with valid data", () => {
            const data = new ProjectData().valid();

            const middleware = middlewares.admin.project;

            const req: any = {
                body: data
            }

            const res: any = {
                render: jest.fn()
            }

            const next = jest.fn();

            middleware.validCreate(req, res, next);

            expect(next).toHaveBeenCalled();
            expect(res.render).not.toHaveBeenCalled();

        })

        test("should call render with invalid data", async () => {
            const middleware = middlewares.admin.project;

            const req: any = {
                body: {
                    title: ""
                }
            }

            const res: any = {
                render: jest.fn()
            }

            const next = jest.fn();

            await middleware.validCreate(req, res, next);

            expect(next).not.toHaveBeenCalled();
            expect(res.render).toHaveBeenCalled()
        })
    })

    describe("validEdit", () => {

        test("should call next with valid data", () => {
            const data = new ProjectData().valid();

            const middleware = middlewares.admin.project;

            const req: any = {
                body: data
            }

            const res: any = {
                render: jest.fn()
            }

            const next = jest.fn();

            middleware.validEdit(req, res, next);

            expect(next).toHaveBeenCalled();
            expect(res.render).not.toHaveBeenCalled();

        })

        test("should call render with invalid data", async () => {
            const middleware = middlewares.admin.project;

            const req: any = {
                body: {
                    title: ""
                }
            }

            const res: any = {
                render: jest.fn()
            }

            const next = jest.fn();

            await middleware.validEdit(req, res, next);

            expect(next).not.toHaveBeenCalled();
            expect(res.render).toHaveBeenCalled()
        })
    })

    describe("findProject", () => {

        test("should populate req.project", async () => {
            const project = await Project.create(new ProjectData().valid()) as ProjectModel;

            const req: any = {
                params: {
                    id: project.id
                },
                project: null
            }

            const res: any = jest.fn()

            const next = jest.fn();

            const middleware = middlewares.admin.project;

            await middleware.findProject(req, res, next);

            expect(next).toHaveBeenCalled()
            expect(req.project.id).toBe(project.id);
            expect(req.project.title).toBe(project.title);
            console.log(project.title);
        })
    })
})