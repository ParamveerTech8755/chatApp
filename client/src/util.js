import {redirect} from "react-router-dom"
export const loader = userState => () => {
	if(userState.username)
		return redirect('/')
	return null
}

export const safeRoute = userState => () => {
	console.log(userState)
	if(!userState.username)
		return redirect('/login')
	return null
} 