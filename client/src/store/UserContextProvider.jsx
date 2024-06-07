import {createContext, useState, useEffect} from "react"

const UserContext = createContext({})

export function UserContextProvider({children}){

	const [userState, setUserState] = useState({username: '', id: null})

	useEffect(() => {
		(async function(){
			const response = await fetch('http://localhost:3000/profile', {credentials: 'include'})
			const resData = await response.json()
			setUserState(resData)
		
		})()

	}, [])


	return (
		<UserContext.Provider value={{userState, setUserState}}>
			{children}
		</UserContext.Provider>
	)
}

export default UserContext