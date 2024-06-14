import {useState, Suspense, useContext} from "react"
import Post from "./Post.jsx"
import {useLoaderData, Await} from "react-router-dom"
import UserContext from "../store/UserContextProvider.jsx"


export default function Feed(){
	const {posts} = useLoaderData()
	const {userState} = useContext(UserContext)

	const [list, setList] = useState([])

	return (
		<section className="grow h-full bg-blue-50 relative">
			<div className="mx-auto h-full p-2 w-full md:w-2/3 bg-white flex flex-col absolute inset-0 overflow-y-auto">
			<Suspense fallback={<p className="h-full flex items-center justify-center font-bold">Loading...</p>}>
				<Await resolve={posts}>
					{postList => {
						return postList.map((item, ind) => 
							<Post
								key={item._id}
								owner={item.owner}
								id={item._id}
								file={item.name}
								likes={item.likes}
								caption={item.caption}
							/>)
					}}
				</Await>
			</Suspense>
			</div>
		</section>
	)
}