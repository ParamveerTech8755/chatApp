import Uploader from "../components/Uploader.jsx"
import Feed from "../components/Feed.jsx"
import {redirect, json, defer, Navigate} from "react-router-dom"
import axios from "axios"
import UserContext from "../store/UserContextProvider.jsx"
import {useContext} from "react"

export default function Home(){
	const {userState} = useContext(UserContext)

	if(!userState.id)
		return <Navigate to="/login" />

	return (
		<div className="flex gap-0 h-full">
			<Uploader />
			<Feed />
		</div>
	)
}

async function loadPosts(){
	//make a call for all the posts
	try{
		const response = await axios.get('https://chatapp-93y0.onrender.com', {withCredentials: true})
		const posts = response.data
		return posts

	}catch(err){
		console.log('error')
		throw json({message: "Couldn't fetch posts"}, {status: response.status || 500})
	}
}

export const loader = userState => () => {
	return defer({
		posts: loadPosts()
	})
}