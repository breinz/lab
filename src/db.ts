import mongoose from "mongoose";

import config from "./config";

export const db = mongoose.createConnection(config.DB, { useNewUrlParser: true });

//db.then(value => {
//    console.log("DB connected to", config.DB);
//})