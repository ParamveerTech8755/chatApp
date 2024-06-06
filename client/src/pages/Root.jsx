import MainNavigation from "../components/MainNavigation.jsx"
import {Outlet} from "react-router-dom"

export default function Root(){
	return (
		<div className="h-screen flex flex-col gap-0">
			<MainNavigation />
			<main className="grow">
			{/*67.2px is the height of the main navigation*/}
				<Outlet />
			</main>
		</div>
	)
}