import logoImg from "../assets/logo.png"
import Button from "./UI/Button.jsx"
import Heading from "./UI/Heading.jsx"
import {Link} from "react-router-dom"
import {useContext, useState} from "react"
import UserContext from "../store/UserContextProvider.jsx"
import HomeSVG from "./UI/HomeSVG.jsx"
import ChatSVG from "./UI/ChatSVG.jsx"
import CustomLink from "./UI/CustomLink.jsx"

export default function MainNavigation(){
	const {userState} = useContext(UserContext)

	return (
		<header className="flex justify-between items-center sticky top-0 bg-white/75 p-2 shadow-md">
			<div className="flex items-center gap-0">
				<img src={logoImg} className="object-contain max-h-16 max-w-16" />
				<Heading>Chat App</Heading>
				<nav className="ml-4 md:ml-20 flex gap-8">
					<CustomLink to="/" text="Home">
						<HomeSVG />
					</CustomLink>
					<CustomLink to="/chat" text="Chat">
						<ChatSVG />
					</CustomLink>
				</nav>
			</div>
			<div>
			{	userState.username ?
				<>
					<span className="font-bold text-stone-700 mr-8">{userState.username}</span>
					<Link to="/logout"><Button inverse="true">Logout</Button></Link>
				</>
				:
				<>
					<Link to="/login"><Button inverse="true" className="mr-2">Login</Button></Link>
					<Link to="/register"><Button>Register</Button></Link>
				</>
			}
			</div>
		</header>
	)
}