import models from "../model"

module.exports = async () => {
    // Empty database tables
    await models.User.deleteMany({});
    await models.Project.deleteMany({});
    await models.Techno.deleteMany({});
    return;
}