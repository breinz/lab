import ProjectValidator from "../projectValidator";
import PeojectData from "../../model/test/projectData";

describe("ProjectValidator", () => {

    describe("validNew", () => {

        test("should pass validation with valid data", () => {
            const data = new PeojectData().valid();
            const validator = new ProjectValidator(data)

            validator.validCreate();

            expect(Object.keys(validator.errors).length).toBe(0);
        });

        test("should populate errors with invalid data", () => {
            const validator = new ProjectValidator({ title: "" });

            validator.validCreate();

            expect(Object.keys(validator.errors).length).toBeGreaterThan(0);
            expect(validator.errors.title).toBe("Required");
        })
    })

    describe("validTitle", () => {
        test("should not populate errors with valid data", () => {
            const data = new PeojectData().valid();
            const validator = new ProjectValidator(data);

            validator.validTitle();

            expect(Object.keys(validator.errors).length).toBe(0);
        })

        test("should populate errors with invalid data", () => {
            const validator = new ProjectValidator({ title: "" });

            validator.validCreate();

            expect(Object.keys(validator.errors).length).toBeGreaterThan(0);
            expect(validator.errors.title).toBe('Required');
        })
    })
})