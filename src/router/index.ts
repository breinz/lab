import admin from "./adminRouter";
import front from "./front";
import projects from "./admin/projectRouter";
import technos from "./admin/technoRouter";

export default {
    front,
    admin: {
        admin: admin,
        projects: projects,
        technos: technos
    }
}