import faker from "faker";

export default class PeojectData {

    valid() {
        return {
            name: faker.lorem.word()
        }
    }
}