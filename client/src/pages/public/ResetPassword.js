import React ,{useState}from "react";
import {Button} from '../../components'
import { useParams} from "react-router-dom";
import { apiResetPassword } from "../../apis/user";
import { toast } from "react-toastify";

const ResetPassword = () => {
    const [password,setPassword] = useState('')
    const { token } =useParams()
    const handleResetPassword = async() => {
        const respone = await apiResetPassword({password,token})
        if(respone.success){
            toast.info(respone.mes)
        }else {
            
            toast.info(respone.mes)
        }
    }
    return (
        <div className="absolute top-0 left-0 bottom-0 right-0 bg-overlay flex flex-col items-center py-8 z-50"> 
                <div className="flex flex-col gap-4">
                    <label htmlFor="password" className="text-white">Enter your password:</label>
                    <input 
                    type="text" 
                    id="password" 
                    className="w-[800px] border-b ourline-none placeholder:text-sm" 
                    placeholder="Type here" 
                    value={password} 
                    onChange={e=>setPassword(e.target.value)} />
                <div className="flex items-center justify-end w-full gap-4">
                    <Button 
                    name='Submit'
                    handlOnClick={handleResetPassword}
                    style='px-4 py-2 rounded-md text-white bg-blue-500 text-semibold my-2'/>
                    
                </div>
            </div>
                
        </div>
    )
}

export default ResetPassword