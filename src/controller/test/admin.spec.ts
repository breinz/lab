import AdminController from "../admin";

describe("AdminController", () => {

    describe("index", () => {

        test("should call render", () => {

            const req: any = {};

            const res: any = {
                render: jest.fn()
            }

            const adminController = new AdminController()

            adminController.index(req, res)

            expect(res.render).toHaveBeenCalled();
        })
    })
})