import {useState} from 'react';
import { useDropzone } from 'react-dropzone';
import Button from "./UI/Button.jsx"
import axios from "axios"

function FileUpload ({goBack}) {

  const [caption, setCaption] = useState('')
  const [uploadedFile, setUploadedFile] = useState(null)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const {acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop: acceptedFiles => {
      const file = acceptedFiles[0]
      const reader = new FileReader()
      reader.onload = () => {
        setUploadedFile(reader.result)
      }
      reader.readAsDataURL(file)
    }
  });

  async function handleSubmit(){
    if(acceptedFiles.length === 0 && !caption.trim())
      return
    
    try{
      setLoading(true)
      let fileData = null
      if(acceptedFiles.length)
        fileData = {name: acceptedFiles[0].name, data: uploadedFile}

      const response = await axios.post('http://localhost:3000/post',
          {
            file: fileData,
            caption
          },
          {
            withCredentials: true,
            headers:{
              "Content-Type": "application/json"
            }
          }
        )
      goBack('success')
    }catch(err){
      setError(true)
    }
    setLoading(false)
  }

  const isContent = caption || uploadedFile

  function handleCancel(){
    setUploadedFile(null)
    setLoading(false)
    setError(false)

    if(!uploadedFile)
      goBack()
  }


  return (
    <section className="w-full p-2 box-border h-1/3">
      <div {...getRootProps()}
        className={"outline-none h-full rounded-md w-full border-2 border-blue-200 border-dashed flex flex-col justify-center items-center " + 
        (!uploadedFile ? "hover:cursor-pointer" : null)}>
      {uploadedFile ? <p className="text-center font-bold">Preview<img src={uploadedFile} /></p> : 
        <p className="text-sm text-center">Drag and drop a file here or click to browse.</p>}
          {!uploadedFile && <input {...getInputProps()} multiple={false} accept="image/*" />}  
      </div>
      <div>
      <textarea value={caption} placeholder="Add caption..."
        className="outline-none rounded-sm my-2 px-1 text-lg border-2 border-stone-400 w-full" 
        onChange={event => setCaption(event.target.value)}
      />
      </div>      
      <div className={isContent ? "flex justify-center" : null}>
        <button className="text-stone-500 hover:text-stone-950" onClick={handleCancel}>Cancel</button>
        {isContent && !error && <Button className="grow max-w-32 mx-4" onClick={handleSubmit}>{loading ? 'Submitting...' : 'Post'}</Button>}
        {error && <p className="m-1 rounded-md px-1 text-red-700 bg-rose-300 text-center">Oops... Failed to Post file</p>}
      </div>
    </section>
  );
};
export default FileUpload;