import HeartOutline from "./UI/HeartOutline.jsx"
import HeartSolid from "./UI/HeartSolid.jsx"
import {useState, useContext, useEffect} from "react"
import UserContext from "../store/UserContextProvider.jsx"
import WSContext from "../store/WebSocketContextProvider.jsx"
export default function Post({id, likes, file, caption, owner}){

	const {userState} = useContext(UserContext)
	const {ws} = useContext(WSContext)
	const [likeArr, setLikeArr] = useState(likes)
	//check if this user has liked this post or not
	const isLiked = likeArr.includes(userState.id)

	// const [likeNum, setLikeNum] = useState(likes.length)

	useEffect(() => {
		if(!ws)
			return
		ws.addEventListener('message', handleMessage)
	}, [ws])

	function handleMessage(event){
		const message = JSON.parse(event.data)
		/*
			id:
			likes:
		*/
		// console.log('here')
		if(message.post && message.post.id === id)
			setLikeArr(message.post.likes)
	}

	function callAPI(newLikes){
		ws.send(JSON.stringify({
			postId: id,
			likes: newLikes
		}))	
	}

	function toggleLike(){
		let newLikes = []

		if(isLiked)
			setLikeArr(prevArr => newLikes = prevArr.filter(id => id !== userState.id))
		else
			setLikeArr(prevArr => newLikes = [userState.id, ...prevArr])
		console.log(newLikes)
		callAPI(newLikes)
	}

	return (
		<div className="max-h-2/3 md:max-h-1/3 shadow-lg flex flex-col gap-1 mb-4 px-2">
			{file && <a href={`http://localhost:3000/posts/${file}`} target="_blank">
				<div className="bg-black h-2/3">
					<img src={`http://localhost:3000/posts/${file}`} className="object-contain" />
				</div>
				</a>
			}
			<p className="font-bold text-xl mb-2">{owner}</p>
			{caption && <p className="whitespace-pre mb-2">{caption}</p>}
			<p className="flex items-center mb-2"><button onClick={toggleLike}>{isLiked ? <HeartSolid /> : <HeartOutline />}</button>
				<span className="ml-2 font-bold text-stone-800">{likeArr.length}</span>
			</p>
		</div>
	)
}