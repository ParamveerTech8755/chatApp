import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"
// import bodyParser from "body-parser"
import {UserModel as User} from "./models/User.js"
import jwt from "jsonwebtoken"
import cors from "cors"

dotenv.config()
const PORT = 3000
const app = express()


// console.log(process.env.MONGO_URL)
// mongoose.connect(process.env.MONGO_URL)
//add error handling for this


app.use(express.json())
app.use(cors({
	credentials:true,
	origin: process.env.CLIENT_URL
}))

app.get('/', (req, res) => {
	res.send("test ok")
})

app.post('/register', (req, res) => {

	// try{
	// 	const createdUser = await User.create(req.body)
	// 	const token = jwt.sign({userId: createdUser._id}, process.env.JWT_SECRET)
	// 	res.cookie('token', token).status(201).json({message: 'User created successfully!'})
	// }catch(error){
	// 	res.json({message: error.message || "An error occurred while creating the user"})
	// }
	res.json(req.body)
})

app.listen(PORT, error => {
	console.log(`Server running on port ${PORT}.`)
})

