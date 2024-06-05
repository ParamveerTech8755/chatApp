import {useState} from "react"

const inputCss = "block w-full my-2 rounded-md py-1	px-1 text-lg border-2 border-stone-200"

export default function Register(){
	const [userInput, setUserInput] = useState({
		username: '',
		password: ''
	})
	async function handleRegister(event){
		event.preventDefault()
		try{
			const response = await fetch("http://localhost:3000/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json" 
				},
				body: JSON.stringify(userInput)
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
		<div className="bg-blue-50 h-screen flex items-center">
			<form className="w-full px-4 md:w-80 mx-auto" onSubmit={handleRegister}>
				<h2 className="text-center text-xl mb-8 font-bold">Chat App</h2>
				<input className={inputCss} value={userInput.username}
					onChange={({target}) => setUserInput(prevInput => ({username: target.value, password: prevInput.password}) )}
					type="text" placeholder="username" required />
				<input className={inputCss} value={userInput.password} 
					onChange={({target}) => setUserInput(({username}) => ({username, password: target.value}) )}
					type="password" placeholder="password" required />
				<button className="bg-blue-500 text-white px-2 py-1 w-full rounded-sm hover:scale-105 hover:bg-blue-600">Register</button>
				<button type="button" className="w-full underline text-right hover:text-blue-800">Already a user? Login</button>
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