import {createContext, useState, useEffect} from "react"
import axios from "axios"

const UserContext = createContext({})

export function UserContextProvider({children}){

	const [userState, setUserState] = useState({username: '', id: null})

	useEffect(() => {
		(async function(){

			try{
				const {data, status} = await axios.get('http://localhost:3000/profile', {withCredentials: true})
				if(status === 200){
					setUserState(data)
				}
			}
			catch({response}){
				if(response.status === 401 && location.href !== 'http://localhost:5173/login')
					location.href = '/login'
			}
		
		})()

	}, [])

	return (
		<UserContext.Provider value={{userState, setUserState}}>
			{children}
		</UserContext.Provider>
	)

}

export default UserContext