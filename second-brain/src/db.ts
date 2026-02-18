
import mongoose, {model, Schema} from "mongoose";
import {MONGO_URL} from "./config.js"

const UserSchema = new Schema({
    username: {type: String, unique: true, required: true, trim: true},
    password: {type: String, required: true}
})

export const UserModel = model("User", UserSchema);

const ContentSchema = new Schema({
    title: String,
    link: String,
    tags: [{type: mongoose.Types.ObjectId, ref: 'Tag'}],
    type: String,
    userId: {type: mongoose.Types.ObjectId, ref: 'User', required: true },
})

const LinkSchema = new Schema({
    hash: String,
    userId: {type: mongoose.Types.ObjectId, ref: 'User', required: true, unique: true },
})

export const LinkModel = model("Links", LinkSchema);
export const ContentModel = model("Content", ContentSchema);

async function initDb() {
    await mongoose.connect(MONGO_URL);
    // Ensure DB indexes match schema and remove stale unique indexes.
    await UserModel.syncIndexes();
}

initDb().catch((err) => {
    console.error("Database initialization failed", err);
});
