import {useState} from "react"

export default function StatefullInput({className = '', ...props}){

	// const [data, setData] = useState('')
	let after = null

	// send(data)

	if(props.hasOwnProperty('required'))
		after = <span className="font-bold text-red-600" ><sup>*</sup></span>
	return (
		<>
			<input {...props} 
			// value={data} onChange={({target}) => setData(target.value)}
				className={`mb-1 rounded-md py-1 px-1 text-lg border-2 border-stone-200 ${className}`}
			/>
			{after}
		</>
	)
}