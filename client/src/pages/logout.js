import {redirect} from "react-router-dom"
import axios from "axios"

export const logoutLoader = setUserState => async () => {
	const {data} = await axios.get(import.meta.env.VITE_BASE_URL + '/logout', {withCredentials: true})

	setUserState({
		username: '',
		id: null
	})
	return redirect('/')
}