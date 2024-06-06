export default function Heading({children, className = ''}){
	return (
		<h2 className={"text-2xl font-bold text-center text-stone-600 " + className} >{children}</h2>
	)
}