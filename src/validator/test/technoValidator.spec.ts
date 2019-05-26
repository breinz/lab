import TechnoValidator from "../technoValidator";
import TechnoData from "../../model/test/technoData";

describe("TechnoValidator", () => {

    describe("validNew", () => {

        test("should pass validation with valid data", () => {
            const data = new TechnoData().valid();
            const validator = new TechnoValidator(data)

            validator.validNew();

            expect(Object.keys(validator.errors).length).toBe(0);
        });

        test("should populate errors with invalid data", () => {
            const validator = new TechnoValidator({ name: "" });

            validator.validNew();

            expect(Object.keys(validator.errors).length).toBeGreaterThan(0);
            expect(validator.errors.name).toBe("Required");
        })
    })

    describe("validName", () => {
        test("should not populate errors with valid data", () => {
            const data = new TechnoData().valid();
            const validator = new TechnoValidator(data);

            validator.validName();

            expect(Object.keys(validator.errors).length).toBe(0);
        })

        test("should populate errors with invalid data", () => {
            const validator = new TechnoValidator({ name: "" });

            validator.validName();

            expect(Object.keys(validator.errors).length).toBeGreaterThan(0);
            expect(validator.errors.name).toBe('Required');
        })
    })
})