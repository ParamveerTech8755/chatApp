import {redirect} from "react-router-dom"
import axios from "axios"

export const logoutLoader = setUserState => async () => {
	const {data} = await axios.get('http://localhost:3000/logout', {withCredentials: true})

	setUserState({
		username: '',
		id: null
	})
	return redirect('/')
}