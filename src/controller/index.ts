import TechnosController from "./admin/technosController";
import ProjectController from "./admin/projectController";

export default {
    admin: {
        project: new ProjectController(),
        technos: new TechnosController()
    }
}