import faker from "faker";

export default class ProjectData {
    valid() {
        return {
            title: faker.lorem.word()
        }
    }
}