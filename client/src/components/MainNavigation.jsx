import logoImg from "../assets/logo.png"
import Button from "./UI/Button.jsx"
import Heading from "./UI/Heading.jsx"
// import {Link} from "react-router-dom"

export default function MainNavigation(){
	return (
		<header className="flex justify-between items-center sticky top-0 bg-white/75 p-2">
			<div className="flex items-center gap-0">
			<img src={logoImg} className="object-contain max-h-16 max-w-16" />
			<Heading>Chat App</Heading>
			</div>
			<div>
				<Button inverse="true" className="mr-2">Login</Button>
				<Button>Register</Button>
				{/*<Link to="/user/login"><Button inverse className="mr-2">Login</Button></Link>*/}
				{/*<Link to="/user/register"><Button>Register</Button></Link>*/}
			</div>
		</header>
	)
}