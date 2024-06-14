import {redirect} from "react-router-dom"
import axios from "axios"

export const logoutLoader = setUserState => async () => {
	const {data} = await axios.get('https://chatapp-93y0.onrender.com/logout', {withCredentials: true})

	setUserState({
		username: '',
		id: null
	})
	return redirect('/')
}