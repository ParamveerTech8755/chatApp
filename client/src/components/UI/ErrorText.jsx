export default function ErrorText({children, className}){
	return (
		<p className={"text-sm text-rose-700 rounded-md bg-rose-300 pl-1 " + className}>{children}</p>
	)
}