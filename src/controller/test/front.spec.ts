import faker from "faker"

import FrontController from "../front"
import User, { UserModel } from "../../model/user";

describe("frontController", () => {

    describe("index", () => {

        test("should render index", () => {

            const req: any = {};

            const res: any = {
                render: jest.fn()
            }

            const frontController = new FrontController();

            frontController.index(req, res);

            expect(res.render).toHaveBeenCalled();
            expect(res.render).toHaveBeenCalledWith("index");
        })

    });

    describe("getSignin", () => {

        test("should render signin", () => {
            const req: any = {};

            const res: any = {
                render: jest.fn()
            }

            const frontController = new FrontController();

            frontController.getSignin(req, res);

            expect(res.render).toHaveBeenCalled();
            expect(res.render).toHaveBeenCalledWith("signin");
        })
    })

    describe("signin", () => {

        test("should create a user", async () => {
            const req: any = {
                body: {
                    name: "Signin",
                    email: faker.internet.email(),
                    password: "pom"
                },
                flash: jest.fn()
            };

            const res: any = {
                redirect: jest.fn()
            }

            const frontController = new FrontController();

            await frontController.signin(req, res);

            expect(res.redirect).toHaveBeenCalled();

            const user = await User.findOne({ name: "Signin" }) as UserModel;
            expect(user.email).toBe(req.body.email);
        })
    })

    describe("getLogin", () => {

        test("should render login", () => {

            const req: any = {};

            const res: any = {
                render: jest.fn()
            }

            const frontController = new FrontController();

            frontController.getLogin(req, res);

            expect(res.render).toHaveBeenCalled();
            expect(res.render).toHaveBeenCalledWith("login");
        })
    })

    describe("login", () => {

        test("should set a cookie and redirect to /", async () => {
            const data = {
                name: "login",
                email: faker.internet.email(),
                password: "pom"
            };

            await User.create(data);

            const req: any = {
                body: {
                    email: data.email
                },
                flash: jest.fn()
            }

            const res: any = {
                cookie: jest.fn(),
                redirect: jest.fn()
            }

            const frontController = new FrontController();

            await frontController.login(req, res);

            expect(res.cookie).toHaveBeenCalled();
            expect(res.redirect).toHaveBeenCalled();
        })
    })

})