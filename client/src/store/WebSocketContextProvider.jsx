import {createContext, useState, useContext, useEffect} from "react"
import UserContext from "./UserContextProvider.jsx"

const WSContext = createContext({})

export function WSContextProvider({children}){
	const [ws, setWs] = useState(null)
	const {userState} = useContext(UserContext)

	//connect to WS here
	function connectToWS(){
		if(!userState.id)
			return
		if(ws)
			ws.close()
		const wsServer = new WebSocket('ws://chatapp-93y0.onrender.com')
		setWs(wsServer)
		wsServer.addEventListener('disconnect', () => {
			setTimeout(() => connectToWS(), 1000)
		})
	}

	useEffect(() => {connectToWS()}, [userState])

	return (
		<WSContext.Provider value={{ws, connectToWS}}>
			{children}
		</WSContext.Provider>
	)
}

export default WSContext