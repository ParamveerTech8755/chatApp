import MainNavigation from "../components/MainNavigation.jsx"
import {Outlet} from "react-router-dom"
import {WSContextProvider} from "../store/WebSocketContextProvider.jsx"


export default function Root(){
	return (
		<div className="h-screen flex flex-col gap-0">
				<MainNavigation />
				<main className="grow">
					<WSContextProvider>
						<Outlet />
					</WSContextProvider>
				</main>
		</div>
	)
}