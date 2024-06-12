import Contact from "../components/Contact.jsx"
import UserContext from "../store/UserContextProvider.jsx"
import {useContext} from "react"


export default function OnlineContacts({people, selectedUser, setSelectedUser}){

	const {userState} = useContext(UserContext)
	if(userState.id in people)
		delete people[userState.id]

	return (
		<aside className="bg-blue-50 hidden h-full sm:block sm:max-md:w-1/3 md:w-80 bg-white px-2 pt-2">
				{Object.keys(people).map(userId => 
					<Contact selectUser={() => {
							// fetchMessages()
							setSelectedUser(userId)
						}}
						online={people[userId].online}
						key={userId} 
						username={people[userId].username} 
						id={userId}
						isSelected={userId === selectedUser} />)}
		</aside>
	)
}