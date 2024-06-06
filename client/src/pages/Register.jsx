// import {useState} from "react"
import Button from "../components/UI/Button.jsx"
import Input from "../components/UI/StatefullInput.jsx"
import Heading from "../components/UI/Heading.jsx"

export default function Register(){

	const userData = {
		username: '',
		password: ''
	}

	async function handleRegister(event){
		event.preventDefault()
		try{
			const response = await fetch("http://localhost:3000/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json" 
				},
				body: JSON.stringify(userData)
			})
			if(!response.ok){
				throw new Error('some error occurred')
			}
			const resData = await response.json()
			console.log(resData)
		}
		catch(error){
			console.log(error.message || 'some error')
		}

	}

	return (
		<div className="bg-blue-50 h-[100%] flex items-center">
			<form className="w-full mb-8 px-4 md:w-[24rem] mx-auto" onSubmit={handleRegister}>
				<Heading className="mb-2">Register</Heading>
				<div className="w-full" ><Input placeholder="username" className="w-[90%] mr-1" get={username => userData.username = username} required /></div>
				<div className="w-full" ><Input placeholder="password" className="w-[90%] mr-1" get={password => userData.password = password} required type="password" /></div>
					<Button className="w-[90%]">Register</Button>
				<button type="button" className="w-full underline pr-8 text-right hover:text-blue-800">Already a user? Login</button>
			</form>
		</div>
	)
}
//to do
/*
add client side validation
check if username exists
password strength and show/hide password
*/