import {redirect} from "react-router-dom"

export const loader = userState => () => {
	if(userState.username)
		return redirect('/')
	return null
}

export const safeRoute = userState => () => {
	if(!userState.id)
		return redirect('/login')
	return null
}
export function delay(time){
	return new Promise(resolve => {
		setTimeout(() => resolve('ok'), time)
	})
}