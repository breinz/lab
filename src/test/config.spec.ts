import config from "../config"

describe("config", () => {

    test("should match snapshot", () => {
        expect(config).toMatchSnapshot();
    })

})