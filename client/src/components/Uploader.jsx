import {useState} from "react"
import Button from "./UI/Button.jsx"
import FileUpload from "./FileUpload.jsx"

export default function Uploader(){
	const [isUploading, setIsUploading] = useState(false)
	const [success, setSuccess] = useState(false)

	let content = <p className="mt-2 md:mt-20 text-center"><Button className="w-full max-w-60" onClick={() => setIsUploading(true)}>Post</Button></p>

	if(isUploading)
		content = (
			<FileUpload goBack={handleReturn}/>
		)

	function handleReturn(msg = ''){
		setIsUploading(false)
		if(msg === 'success'){
			setSuccess(true)
			setTimeout(() => {setSuccess(false)}, 2000)
		}
	}


	return (
		<aside className="bg-white h-full hidden sm:block sm:max-md:w-1/3 md:w-80">
			{content}
			{success && <p className="flex mx-auto max-w-28 gap-2 justify-center bg-green-200 rounded-sm px-1 m-2">
				<span>Posted!</span>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  					<path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
				</svg>
			</p>}
		</aside>
	)
}