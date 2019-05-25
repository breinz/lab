import User from "../model/userModel";

module.exports = async () => {
    await User.deleteMany({});
    return;
}