import faker from "faker";

import UserValidator from "../user"
import User from "../../model/user"

describe("UserValidator", () => {

    describe("isValidForSignin", () => {

        test("should be truthy with valid data", async () => {
            const data = {
                name: faker.name.findName(),
                email: faker.internet.email(),
                password: "pompom",
                password_repeat: "pompom"
            }

            const validator = new UserValidator(data);

            expect(await validator.isValidForSignin()).toBeTruthy();
            expect(Object.keys(validator.errors).length).toBe(0)
        })

        test("should be faulty with invalid data", async () => {
            const validator = new UserValidator({});

            expect(await validator.isValidForSignin()).not.toBeTruthy();
            expect(Object.keys(validator.errors).length).toBeGreaterThan(0);
        })
    })

    describe("isValidForLogin", () => {

        beforeAll(async () => {
            await User.create({
                name: "isValidForLogin",
                email: "isValidForLogin@test.com",
                password: "pom"
            })
        })

        test("should pass with valid data", async () => {
            const data = {
                email: "isValidForLogin@test.com",
                password: "pom"

            };

            const validator = new UserValidator(data);

            const result = await validator.isValidForLogin();

            expect(result).toBeTruthy();
        })

        test("should fail with invalid data", async () => {
            const data = {
                email: faker.internet.email(),
                password: "invalid"

            };

            const validator = new UserValidator(data);

            expect(await validator.isValidForLogin()).not.toBeTruthy();
        })
    })

    describe("validName", () => {

        test("shouldn't populate errors with valid data", () => {

            const data = {
                name: "pom",
                email: faker.internet.email(),
                password: "pompom"
            }

            const validator = new UserValidator(data);

            validator.validateName();

            expect(Object.keys(validator.errors).length).toBe(0);
        });

        test("should populate errors with invalid data", () => {
            const validator = new UserValidator({});

            validator.validateName();

            expect(Object.keys(validator.errors).length).toBe(1);
            expect(validator.errors.name).toBe("required")
        })
    });

    describe("validEmail", () => {

        test("shouldn't populate errors with valid data", async () => {
            const data = {
                email: faker.internet.email()
            }

            const validator = new UserValidator(data);

            await validator.validateEmail(true);

            expect(Object.keys(validator.errors).length).toBe(0);
        })

        test("should populate errors with empty email", async () => {
            const validator = new UserValidator({});

            await validator.validateEmail(true);

            expect(Object.keys(validator.errors).length).toBe(1);
            expect(validator.errors.email).toBe("required");
        })

        test("should populate errors with invalid email", async () => {
            const data = {
                email: "pom@pom"
            }

            const validator = new UserValidator(data)

            await validator.validateEmail(true);

            expect(Object.keys(validator.errors).length).toBe(1);
            expect(validator.errors.email).toBe("invalid");
        })

        test("should fail with existing email", async () => {
            const data = {
                name: "Existing email",
                email: faker.internet.email(),
                password: "pom"
            }

            await User.create(data)

            const validator = new UserValidator(data);

            await validator.validateEmail(true)

            expect(Object.keys(validator.errors).length).toBe(1);
            expect(validator.errors.email).toBe("taken");
        })
    })

    describe("validPassword", () => {

        test("should populate errors if empty", () => {
            const validator = new UserValidator({});

            validator.validatePassword();

            expect(Object.keys(validator.errors).length).not.toBe(0);
            expect(validator.errors.password).toBe("required");
        })
    })

    describe("validatePasswordRepeat", () => {

        test("should populate errors if password_repeat empty", () => {
            const validator = new UserValidator({});

            validator.validatePasswordRepeat();

            expect(Object.keys(validator.errors).length).not.toBe(0);
            expect(validator.errors.password).toBe("dont_match");

        })

        test("should populate errors if passwords don't match", () => {
            const data = {
                password: "pom",
                password_repeat: "poi"
            };

            const validator = new UserValidator(data);

            validator.validatePasswordRepeat();

            expect(Object.keys(validator.errors).length).not.toBe(0);
            expect(validator.errors.password).toBe("dont_match");
        })
    })

    describe("validateLogin", () => {

        beforeAll(async () => {
            await User.create({
                email: "login@test.com",
                password: "pompom"
            })
        })

        test("should populate error with email not in db", async () => {
            const validator = new UserValidator({
                email: "invalid@test.com",
                password: "pompom"
            })

            await validator.validateLogin();

            expect(Object.keys(validator.errors).length).toBe(1);
            expect(validator.errors.login).toBe("invalid")
        })

        test("should populate errors with wrong password", async () => {
            const validator = new UserValidator({
                email: "login@test.com",
                password: "invalid"
            })

            await validator.validateLogin();

            expect(Object.keys(validator.errors).length).toBe(1);
            expect(validator.errors.login).toBe("invalid")
        })

        test("should not populate errors with valid data", async () => {
            const validator = new UserValidator({
                email: "login@test.com",
                password: "pompom"
            })

            await validator.validateLogin();

            expect(Object.keys(validator.errors).length).toBe(0);
            expect(validator.errors.login).not.toBeDefined()
        })
    })
})