let mongoose = require("mongoose")

module.exports = async () => {
    const { connections } = mongoose;

    for (const con of connections) {
        return con.close();
    }
    return mongoose.disconnect();
}