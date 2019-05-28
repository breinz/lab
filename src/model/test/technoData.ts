import faker from "faker";

export default class TechnoData {

    valid() {
        return {
            name: faker.lorem.word()
        }
    }
}