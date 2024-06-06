export default function Button({children, className = '', ...props}){

	let style = "bg-blue-500 text-white px-2 py-1 rounded-sm hover:scale-105 hover:bg-blue-600"
	if(props.hasOwnProperty('inverse'))
		style = "border-2 text-blue-500 border-blue-500 bg-transparent px-2 py-1 rounded-sm hover:scale-105 hover:border-blue-600 hover:text-blue-600"

	return (
		<button 
		{...props}
		className={style + " " + className}>
			{children}
		</button>
	)
}