import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"
import {UserModel as User} from "./models/User.js"
import {MessageModel as Message} from "./models/Message.js"
import jwt from "jsonwebtoken"
import cors from "cors"
import cookieParser from "cookie-parser"
import bcrypt from "bcryptjs"
import {WebSocketServer} from "ws"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from "fs"

const {compare, hash} = bcrypt
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PORT = 3000
const app = express()

dotenv.config()

//add error handling for this

app.use(cookieParser())
app.use(express.json())
app.use(cors({
	credentials:true,
	origin: process.env.CLIENT_URL
}))
app.use('/uploads', express.static(__dirname + '/uploads'))

mongoose.connect(process.env.MONGO_URL)


function createToken(data){
	return jwt.sign(data, process.env.JWT_SECRET)
}
function setCookie(token, res){
	return res.cookie('token', token, {sameSite:'none', secure: true}).status(201)

}

function getUserData(req){
	const {token} = req.cookies
	if(token)
		return jwt.verify(token, process.env.JWT_SECRET)
	return null
}

app.get('/profile', (req, res) => {

	const userData = getUserData(req)
	if(userData)
		return res.status(200).json(userData)
	else
		return res.status(401).json({message: "redirect"})
})

app.get('/people', async (req, res) => {
	const users = await User.find({}, {'_id': true, username: true})
	res.json(users).status(200)
})

app.post('/register', async (req, res) => {

	const {username, password} = req.body
	const error = {}
	try{
		const existingUsers = await User.find({username: username})
		if(existingUsers.length !== 0)
			error.username = "This username is already taken"
		
	}catch(error){
		return res.status(500).json(error.message || "Couldn't connect to database")
	}

	
	if(password.length < 6)
		error.password = "Password must atleast be 6 characters long"


	if(Object.keys(error).length > 0)
		return res.status(422).json({
			message: 'validation errors',
			error
		})

	try{
		const hashedPassword = await hash(password, 10)
		const createdUser = await User.create({username, password: hashedPassword})

		const token = createToken({id: createdUser._id, username: createdUser.username})
		setCookie(token, res).json({
			username: createdUser.username,
			id: createdUser._id
		})
	}catch(error){
		res.status(500).json({message: error.message || "An error occurred while creating the user"})
	}
})

app.post('/login', async (req, res) => {
	const error = {}
	const {username, password} = req.body

	try{
		const user = await User.findOne({username: username})
		if(user){
			if(compare(user.password, password)){
				//authenticate user		
				const token = createToken({id: user._id, username: user.username})
				setCookie(token, res).json({
					username: user.username,
					id: user._id
				})
			}
			else
				res.status(401).json({message: "Username or password is incorrect", password: true})
		}else
			res.status(401).json({message: "Entered username does not exist", username: true})
	}
	catch(error){
		console.log(error.status)
		res.status(500).json({message: error.message || "Couldn't log in"})
	}

})

app.use((req, res, next) => {
	const result = getUserData(req)
	if(!result)
		return res.status(401).json({message: 'Unauthorized!'})
	next()
})

app.get('/logout', (req, res) => {
	res.clearCookie("token")
	return res.status(200).json('ok')
})

app.get('/messages/:userId', async (req, res) => {
	const userData = getUserData(req)
	//query the database for messages
	const {userId} = req.params
	const messages = await Message.find({
		sender: {$in: [userId, userData.id]},
		recipient: {$in: [userId, userData.id]}
	}).sort({createdAt: 1})

	res.status(200).json(messages)

})


const server = app.listen(PORT, error => {
	console.log(`Server running on port ${PORT}.`)
})

function notifyOnlineClients(wss){
	[...wss.clients].forEach(client => {
		client.send(JSON.stringify({
			online: [...wss.clients].map(({username, id}) => ({id, username, online:true}))
		}))
	})
}

const wss = new WebSocketServer({server})

wss.on('connection', (connection, req) => {
	const cookies = req.headers.cookie
	if(cookies){
		const tokenCookie = cookies.split(';').find(str => str.startsWith('token='))
		if(tokenCookie){
			const token = tokenCookie.split('=')[1]
			const {username, id} = jwt.verify(token, process.env.JWT_SECRET)
			connection.id = id
			connection.username = username
		}
	}
	
	notifyOnlineClients(wss)

	connection.on('message', async message => {
		const {recipient, text, file} = JSON.parse(message.toString())
		if(recipient){
			const data = {recipient, text: null, sender: connection.id, file: null}
			if(file){
				//change name
				const ext = file.name.split('.').at(-1)
				const newName = Date.now() + '.' + ext
				const path = __dirname + '/uploads/' + newName
				// console.log(file)
				const fileData = file.data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)[2]
				const bufferData = new Buffer(fileData, 'base64')
				fs.writeFile(path, bufferData, () => {console.log('file saved')})
				data.file = newName
			}
			else if(text){
				data.text = text
			}

			const msgDoc = await Message.create(data)
			const recipients = [...wss.clients].filter(client => client.id === recipient)
			const response = {message: {...data, id: msgDoc._id}}
			connection.send(JSON.stringify(response))
			recipients.forEach(client => client.send(JSON.stringify(response)))
		}
	})

	connection.on('close', () => {
		notifyOnlineClients(wss)
	})

})