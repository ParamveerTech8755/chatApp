import mongoose from "mongoose"

const PostSchema = new mongoose.Schema({
	name: String,
	owner: String,
	caption: String,
	likes: Array
}, {timestamps: true})

export const PostModel = mongoose.model('Post', PostSchema)