import User, { UserModel } from "../user"
import faker from "faker";

describe("UserModel", () => {

    test("must hash password", async () => {

        const data = {
            name: "Hash password",
            email: faker.internet.email(),
            password: "pommpom"
        };

        const user = await User.create(data) as UserModel;

        expect(user.password).not.toBe(data.password);

    })

    test("must not hash password for non-new user", async () => {
        const data = {
            name: "Temp",
            email: faker.internet.email(),
            password: "pommpom"
        };

        const user = await User.create(data) as UserModel;

        const password = user.password;

        user.name = "Don't Hash";

        await user.save();

        expect(user.password).toBe(password);
    })
})