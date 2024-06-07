import UserForm from "../components/UserForm.jsx"
import {json, useActionData, redirect} from "react-router-dom"

export default function Register(){

	const data = useActionData()
	let errProp = {}
	if(data && data.error)
		errProp = data
	
	return (
		<UserForm mode="register" {...errProp} />
	)
}

export const registerAction = setUserState => async function action({request}){
	const data = await request.formData()
	const userData = Object.fromEntries(data.entries())

	const response = await fetch("http://localhost:3000/register", {
		method: "POST",
		headers: {
			"Content-Type": "application/json" 
		},
		body: JSON.stringify(userData)
	})

	if(response.status === 422)
		return response
	
	if(!response.ok)
		throw json({message: "Some error occurred"}, {status: response.status || 500})

	const user = response.json()
	setUserState(user)
	
	return redirect('/')

}

// export registerAction

//to do
/*
add client side validation
check if username exists
password strength and show/hide password
*/