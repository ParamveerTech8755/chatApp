import UserForm from "../components/UserForm.jsx"
import {json, useActionData, redirect} from "react-router-dom"
import axios from "axios"

export default function Register(){

	const data = useActionData()
	let errProp = {}
	if(data && data.error)
		errProp = data
	
	return (
		<UserForm mode="register" {...errProp} />
	)
}


//using fetch
// export const registerAction = setUserState => async function action({request}){
// 	const data = await request.formData()
// 	const userData = Object.fromEntries(data.entries())

// 	const response = await fetch("http://localhost:3000/register", {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json" 
// 		},
// 		body: JSON.stringify(userData)
// 	})

// 	if(response.status === 422)
// 		return response
	
// 	if(!response.ok)
// 		throw json({message: "Some error occurred"}, {status: response.status || 500})

// 	const user = response.json()
// 	setUserState(user)
	
// 	return redirect('/')

// }


//using axios

export const registerAction = setUserState => async function action({request}){
	const data = await request.formData()
	const userData = Object.fromEntries(data.entries())
	try{
		const response = await axios.post('http://localhost:3000/register', userData, {withCredentials: true})
		// console.log(response.status)
		if(response.status === 201){

			setUserState(response.data)
			return redirect('/chat')
		}
	}
	catch({response}){
		if(response.status === 422)
			return response.data

		throw json({message: response.data.message || "Some error occurred"}, {status: response.status || 500})
	}

}




// export registerAction

//to do
/*
add client side validation
check if username exists
password strength and show/hide password
*/