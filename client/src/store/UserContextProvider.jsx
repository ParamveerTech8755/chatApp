import {createContext, useState, useEffect} from "react"
import axios from "axios"

const UserContext = createContext({})

export function UserContextProvider({children}){

	const [userState, setUserState] = useState({username: '', id: null})

	useEffect(() => {
		(async function(){
			// const response = await fetch('http://localhost:3000/profile', {credentials: 'include'})
			// const resData = await response.json()
			try{
				const {data, status} = await axios.get('http://localhost:3000/profile', {withCredentials: true})
				if(status === 200){
					setUserState(data)
					// console.log('userState set')
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