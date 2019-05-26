import UserMiddleware from "./user"
import FlashMiddleware from "./flash";
import ProjectMiddleware from "./projectMiddleware";
import TechnoMiddleware from "./technoMiddleware";
import ImageMiddleware from "./imageMiddleware";

export const userMiddleware = new UserMiddleware();
export const flashMiddleware = new FlashMiddleware();

export default {
    admin: {
        techno: new TechnoMiddleware(),
        project: new ProjectMiddleware()
    },
    image: new ImageMiddleware()
}
