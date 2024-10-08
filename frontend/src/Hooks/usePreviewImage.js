import { useState } from "react"
import toast from "react-hot-toast"

export const usePreviewImage=()=>{

    const [selectedFile,setSelectedFile]=useState(null)
    






    const handleImageChange=(e)=>{
        const file=e.target.files[0]
        
        
        const maxFileSize=2 *1024 *1024;
try{

    if(file && file.type.startsWith("image/"))
        {
            if(file.size>maxFileSize) {
                throw new Error('Selected File Size Excedds the Limit')
                
            }
            else{
                const reader=new FileReader();

                reader.onloadend=()=>{
                    setSelectedFile(reader.result)
                }


                reader.readAsDataURL(file)
            }
        }

     

}

catch(error){
    console.log(error.message)
    toast.error(error.message)
}
       
    }


    return {handleImageChange,selectedFile,setSelectedFile}

}