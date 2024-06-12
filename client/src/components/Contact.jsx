export default function Contact({username, id, selectUser, isSelected, online}){

	const colorArray = ['bg-red-200', 'bg-yellow-200', 'bg-teal-200', 'bg-blue-200', 'bg-purple-200', 'bg-green-200']
	const color = colorArray[parseInt(id, 16) % colorArray.length]
	let styles = "flex gap-4 items-center my-2 rounded-md p-1 hover:bg-stone-200 hover:cursor-pointer "
	if(isSelected)
		styles += 'bg-blue-100'

	return (
		<div className={styles} onClick={selectUser}>
			<div className={"rounded-full relative py-2 px-4 font-bold " + color}>
				{username[0].toUpperCase()}
				<div className={"w-3 h-3 absolute right-0 bottom-0 rounded-full " + (online ? 'bg-green-500' : 'bg-stone-400')}></div>
			</div>
			<p className="text-lg text-stone-800">{username}</p>
		</div>

	)
}