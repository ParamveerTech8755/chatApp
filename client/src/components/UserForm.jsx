import {Link, Form} from "react-router-dom"
import Button from "../components/UI/Button.jsx"
import Input from "../components/UI/StatefullInput.jsx"
import Heading from "../components/UI/Heading.jsx"
import ErrorText from "../components/UI/ErrorText.jsx"
import {useNavigation} from "react-router-dom"


export default function UserForm({mode, error}){
	const navigation = useNavigation()
	const isSubmitting = navigation.state === 'submitting'

	let title = "Sign Up"
	let caption = "Already a user? Login"
	if(mode === 'login'){
		title = "Login"
		caption = "Don't have an account yet? Signup"
	}
	return (
		<div className="bg-blue-50 h-full flex items-center">
			<Form method="post" className="w-full mb-8 px-4 md:w-[24rem] mx-auto">
				<Heading className="mb-2">{title}</Heading>
				<div className="w-full" ><Input placeholder="username" name="username" className="w-[90%] mr-1" required />
				{error && error.username && <ErrorText className="mb-1 w-[90%]" >{error.username}</ErrorText>}
				</div>
				<div className="w-full" ><Input placeholder="password" name="password" className="w-[90%] mr-1" required type="password" />
				{error && error.password && <ErrorText className="mb-1 w-[90%]" >{error.password}</ErrorText>}
				</div>
					<Button disabled={isSubmitting} className="w-[90%]">{isSubmitting ? 'Submitting...' : title}</Button>
				<Link to={`/${mode === 'register' ? 'login' : 'register'}`}><button type="button" className="w-full underline pr-8 text-right hover:text-blue-800 mt-0.5">{caption}</button></Link>
			</Form>
		</div>
	)
}