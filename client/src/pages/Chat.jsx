import {useEffect, useState, useContext, useRef} from "react"
import {useNavigate, Navigate} from "react-router-dom"
import UserContext from "../store/UserContextProvider.jsx"
import WSContext from "../store/WebSocketContextProvider.jsx"
import SendButton from "../components/UI/SendButton.jsx"
import OnlineContacts from "../components/OnlineContacts.jsx"
import Message from "../components/Message.jsx"
import {uniqBy} from "lodash"
import AttachmentButton from "../components/UI/AttachmentButton.jsx"
import {delay} from "../util.js"
import axios from "axios"



export default function Chat(){
	const {userState} = useContext(UserContext)
	const {ws, connectToWS} = useContext(WSContext)
	const [people, setPeople] = useState({})
	const [selectedUser, setSelectedUser] = useState(null)
	const [messages, setMessages] = useState([])
	const msgBox = useRef()
	const navigate = useNavigate()

	useEffect(() => {
		if(ws){
			// connectToWS()
			ws.addEventListener('message', handleMessage)
		}
	}, [ws])

	useEffect(() => {
		(async function(){
			const {data: peopleArr} = await axios.get('http://localhost:3000/people', {withCredentials: true})
			// console.log(peopleObj)
			const peopleObj = {}
			peopleArr.forEach(person => {
				peopleObj[person._id] = {
					username: person.username,
					online: false
				}
			})
			setPeople(peopleObj)
			// connectToWS()
		})()
		
	}, [])

	useEffect(() => {

		// console.log('run')

		(async function(){
			if(!selectedUser)
				return

			const {data} = await axios.get('http://localhost:3000/messages/' + selectedUser, {withCredentials: true})
			const newMessages = data.map(obj => {
				if(obj.sender === userState.id && obj.recipient === selectedUser)
					return {me: true, text: obj.text, id: obj._id, file: obj.file}
				else if(obj.sender === selectedUser && obj.recipient === userState.id)
					return {me: false, text: obj.text, id: obj._id, file: obj.file}
			})

			setMessages(newMessages)

		})()
		
	}, [selectedUser])

	useEffect(() => {
		msgBox.current?.lastElementChild?.scrollIntoView({behavior: 'smooth'})
	}, [messages])

	function showPeople(peopleArr){
		const peopleObj = {}
		peopleArr.forEach(obj => {
			// if(obj.id !== userState.id)
				peopleObj[obj.id] = {
					username: obj.username,
					online: obj.online
				}
		})
		setPeople(prev => ({...prev, ...peopleObj}))
	}

	function handleMessage(event){
		const msgData = JSON.parse(event.data)
		if('online' in msgData)
			showPeople(msgData.online)
		else if('message' in msgData){
			// console.log(msgData.message)
			const {sender, text, id, recipient, file} = msgData.message
			if(sender === selectedUser && recipient === userState.id){
				if(text)
					setMessages(prevState => [...prevState, {me:false, text, id, file: null}])
				else if(file)
					setMessages(prevState => [...prevState, {me:false, text:null, id, file}])
			}
			else if(sender === userState.id && recipient === selectedUser)
				if(text)
					setMessages(prevState => [...prevState, {me: true, text, id}])
				else if(file)
					setMessages(prevState => [...prevState, {me:true, text: null, id, file}])
		}

		// console.log('handleMessage')
	}

	function readFile(file){
		const promise = new Promise(resolve => {
			const reader = new FileReader()
			reader.readAsDataURL(file)
			reader.onload = () => {
				resolve(reader.result)
			}
		})
		return promise
	}

	function sendMessage(event){
		event.preventDefault()
		const fd = new FormData(event.target)
		const text = fd.get('msg')

		if(text){
			ws.send(JSON.stringify({
				text,
				recipient: selectedUser,
				file: null
			}))
			event.target.reset()
		}
	}
	
	async function sendFile(event){
		const file = event.target.files[0]
		//send it using the websocket
		if(file.size){
			const fileData = await readFile(file)
			ws.send(JSON.stringify({
				recipient: selectedUser,
				text: null,
				file:{
					name: file.name,
					data: fileData
				}
			}))
		}
	}


	const uniqueMsgs = uniqBy(messages, 'id')

	if(!userState.id)
		return <Navigate to="/login" />

	return (
		<div className="h-full flex">
			<OnlineContacts people={people} setSelectedUser={setSelectedUser} selectedUser={selectedUser} />
			<div className="bg-blue-100 grow flex flex-col">
				<div className="grow relative">
					{!selectedUser ?
						<div className="font-bold text-stone-400 flex h-full justify-center items-center text-xl">&larr; Select a user</div> : 
								<ul ref={msgBox} className="flex flex-col list-none mx-2 absolute bottom-0 right-0 overflow-y-auto">
									{uniqueMsgs.map(msg => <Message key={msg.id} file={msg.file}
										me={msg.me}>{msg.text}</Message>)}
								</ul>
					}
				</div>
				{selectedUser && <form className="p-2 flex gap-2 items-center lg:text-lg" onSubmit={sendMessage} >
				<input name="selectedUser" value={selectedUser} className="hidden" readOnly />
					<input name="msg" className="rounded-sm p-1 outline-none grow" placeholder="type your message here..." />
					<label className="cursor-pointer">
						<AttachmentButton />
						<input type="file" className="hidden" onChange={sendFile} />
					</label>
					<button className="bg-blue-500 p-2 rounded-full text-white">
						<SendButton />
					</button>
				</form>}
			</div>
		</div>
	)
}
