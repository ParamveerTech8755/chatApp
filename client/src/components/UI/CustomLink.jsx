import {NavLink} from "react-router-dom"

export default function CustomLink({children, text, to}){
	return (
		<NavLink to={to} className={({isActive}) => isActive ? "text-blue-700" : "text-stone-500"}>
			<div className="flex gap-1 items-center justify-center">
				{children}
				<p>{text}</p>
			</div>
		</NavLink>
	)
}