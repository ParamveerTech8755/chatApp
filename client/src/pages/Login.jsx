import UserForm from "../components/UserForm.jsx"
import {useActionData, redirect, json} from "react-router-dom"
import {useContext} from "react"
import UserContext from "../store/UserContextProvider.jsx"
import axios from "axios"

export default function Login(){
	const data = useActionData()
	const error = {}
	if(data && data.username)
		error.username = data.message
	if(data && data.password)
		error.password = data.message

	return (
		<UserForm mode="login" error={error} />
	)
}


//fetch way
// export const loginAction = setUserState => async function action({request}){
// 	const data = await request.formData()
// 	const userData = Object.fromEntries(data.entries())

// 	const response = await fetch("http://localhost:3000/login", {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json"
// 		},
// 		body: JSON.stringify(userData)
// 	})
	
// 	if(response.status === 401)
// 		return response
	
// 	if(!response.ok)
// 		throw json({message: "Some error occurred"}, {status: response.status || 500})

// 	const user = await response.json()
// 	setUserState(user)
// 	console.log('called')
	
// 	return redirect('/')
// }

//axios way
export const loginAction = setUserState => async function action({request}){
	const data = await request.formData()
	const userData = Object.fromEntries(data.entries())
	try{
		const response = await axios.post('https://chatapp-93y0.onrender.com/login', userData, {withCredentials: true})
		// console.log(response.status)
		if(response.status === 201){

			setUserState(response.data)
			return redirect('/chat')
		}
	}
	catch({response}){
		if(response.status === 401)
			return response.data

		throw json({message: response.data.message || "Some error occurred"}, {status: response.status || 500})
	}

}

