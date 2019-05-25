import { UserModel } from "../model/userModel";
import { ProjectModel } from "../model/projectModel";
import { TechnoModel } from "../model/technoModel";

declare global {
    namespace Express {
        export interface Request {
            current_user?: UserModel,
            flash: (type: string, message: string) => void,
            project: ProjectModel,
            techno: TechnoModel
        }
    }
}