import {redirect} from "react-router-dom"

export const logoutLoader = setUserState => () => {
	document.cookie="token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
	setUserState({
		username: '',
		id: null
	})
	return redirect('/')
}