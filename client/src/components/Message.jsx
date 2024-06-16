export default function Message({children, me, file}){
	let color = 'bg-blue-500'
	let align = 'self-start'
	if(me){
		color = 'bg-green-500'
		align = 'self-end'
	}
	if(!file)
		return <li className={`text-neutral-100 px-2 py-1 mb-2 rounded-md max-w-2/3 ${color} ${align}`}>{children}</li>
	else
		return (<li className={`text-neutral-100 px-2 py-1 mb-2 rounded-md max-w-2/3 ${color} ${align}`}>
			<a href={`${import.meta.env.VITE_BASE_URL}/uploads/${file}`} target="_blank" className="underline text-blue-700">
				Attachment
			</a>
		</li>)
}