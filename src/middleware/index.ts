import UserMiddleware from "./user"
import FlashMiddleware from "./flash";
import ProjectMiddleware from "./projectMiddleware";
import TechnoMiddleware from "./technoMiddleware";

export const userMiddleware = new UserMiddleware();
export const flashMiddleware = new FlashMiddleware();
export const projectMiddleware = new ProjectMiddleware();

export default {
    admin: {
        techno: new TechnoMiddleware()
    }
}
