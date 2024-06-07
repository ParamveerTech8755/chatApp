import {useRouteError} from "react-router-dom"
import Heading from "../components/UI/Heading.jsx"

export default function ErrorPage(){

	const error = useRouteError()
	const title = `Error: ${error.status ? error.status : 500}`
	let message

	if(error.status === 404)
		message = "Resource or page not found"
	else
		message = error.message || error.data.message || "Oops...Some Internal Server Error"
	

	return (
		<main className="p-12 w-[80%] mx-auto mt-12 md:mt-24 rounded-md bg-rose-300">
			<Heading className="text-3xl text-rose-700 mb-8">{title}</Heading>
			<p className="text-lg text-rose-700 text-center">{message}</p>
		</main>
	)
}