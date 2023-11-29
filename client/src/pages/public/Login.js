import React,{useState,useCallback, useEffect} from "react";
import { InputField,Button } from "../../components";
import { apiRegister,apiLogin,apiForgotPassword } from "../../apis/user";
import Swal from 'sweetalert2'
import { useNavigate,Link} from "react-router-dom";
import path from "../../ultils/path";
import {regiser} from '../../store/user/userSlide'
import { useDispatch } from "react-redux";
import {toast} from "react-toastify"
import {validate} from '../../ultils/helpers'

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [payload,setPayLoad] = useState({
        email:'',
        password:'',
        firstname:'',
        lastname:'',
        mobile:''
    })
    const [email,setEmail] = useState('')
    const handleForgotPassword = async() => {
        const respone = await apiForgotPassword({email})
        console.log(respone)
        if(respone.success){
            setIsForgotpassword(false)
            toast.info(respone.mes)
        }else {
            
            toast.info(respone.mes)
        }
    }
    
    const[invalidFields,setInvalidFields]= useState([])
    const [isForgotpassword,setIsForgotpassword] = useState(false)
    const [isRegister,setIsRegister] = useState(false)
    const resetPayload = () =>{
        setPayLoad({
            email:'',
            password:'',
            firstname:'',
            lastname:'',
            mobile:''
        })
    }
    useEffect ( () =>{
        resetPayload()
    },[isRegister])
    
    const handleSubmit = useCallback(async () => {
        const {firstname,lastname,mobile,...data}= payload
        const invalids = isRegister ? validate(payload,setInvalidFields) : validate(data,setInvalidFields)
        if(invalids ===0){
            if(isRegister){
                const respone = await apiRegister(payload)
                if(respone.success){
                    Swal.fire('Congradtulation',respone.mes,'success').then(() =>{
                        setIsRegister(false)
                        resetPayload()
                    })
                }else
                    Swal.fire('Oops!',respone.mes,'error')
            }else {
                const rs = await apiLogin(data)
                if(rs.success){
                    dispatch(regiser({isLoggedIn:true,token:rs.accessToken,userData:rs.userData}))
                    navigate(`/${path.HOME}`)
                    
                }else{
                    Swal.fire('Oops!',rs.mes,'error')
                }
            }
        }
    },[payload,isRegister])
    return (
        <div className="w-screen h-screen relative">
            {isForgotpassword && <div className="absolute top-0 left-0 bottom-0 right-0 bg-overlay flex flex-col items-center py-8 z-50"> 
                <div className="flex flex-col gap-4">
                    <label htmlFor="email" className="text-white">Enter your email:</label>
                    <input 
                    type="text" 
                    id="email" 
                    className="w-[800px] border-b ourline-none placeholder:text-sm" 
                    placeholder="Exp: abc@gmail.com" 
                    value={email} 
                    onChange={e=>setEmail(e.target.value)} />
                    <div className="flex items-center justify-end w-full gap-4">
                        <Button 
                        name='Submit'
                        handlOnClick={handleForgotPassword}
                        style='px-4 py-2 rounded-md text-white bg-blue-500 text-semibold my-2'/>
                        <Button 
                        name='Back'
                        handlOnClick={() => setIsForgotpassword(false)}
                        style='px-4 py-2 rounded-md text-white bg-orange-500 text-semibold my-2'
                        />
                    </div>
                </div>
                
            </div>}
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT03pqShIbyEtUiDOGoLbpGdM-t-9qVDIWTuA&usqp=CAU" alt=""
            className="w-full h-full object-cover"/>
            <div className="absolute top-0 bottom-0 left-0 right-1/2 items-center justify-center flex">
                <div className="p-8 bg-white flex flex-col items-center rounded-md min-w-[500px]">
                    <h1 className="text-[28px] font-semibold text-main mb-8" >{isRegister? 'Register':'Login'}</h1>
                    {isRegister && <div className="flex items-center gap-2">
                        <InputField 
                    value={payload.firstname}
                    setValue={setPayLoad}
                    nameKey='firstname'
                    invalidFields={invalidFields}
                    setInvalidFields={setInvalidFields}
                    />
                    <InputField 
                    value={payload.lastname}
                    setValue={setPayLoad}
                    nameKey='lastname'
                    invalidFields={invalidFields}
                    setInvalidFields={setInvalidFields}
                    />
                        </div>}
                    <InputField 
                    value={payload.email}
                    setValue={setPayLoad}
                    nameKey='email'
                    invalidFields={invalidFields}
                    setInvalidFields={setInvalidFields}
                    />
                    {isRegister && <InputField 
                    value={payload.mobile}
                    setValue={setPayLoad}
                    nameKey='mobile'
                    invalidFields={invalidFields}
                    setInvalidFields={setInvalidFields}
                    />}
                    <InputField 
                    value={payload.password}
                    setValue={setPayLoad}
                    nameKey='password'
                    type='password'
                    invalidFields={invalidFields}
                    setInvalidFields={setInvalidFields}
                    />
                    <Button 
                    handlOnClick={handleSubmit}
                    fw>
                        {isRegister ?'Register' : 'Login'}
                    </Button>
                    <div className="flex items-center justify-between my-2 w-full text-sm">
                        {!isRegister && <span onClick={() =>setIsForgotpassword(true)} className="text-blue-500 hover:underline">Forgot your account?</span>}
                        {!isRegister && <span className="text-blue-500 hover:underline"
                        onClick={() => setIsRegister(true)}
                        >
                            Create account</span>}
                        {isRegister && <span className="text-blue-500 hover:underline w-full text-center"
                        onClick={() => setIsRegister(false)}
                        >
                            Go Login</span>}
                    </div>
                    <Link className="text-blue-500 text-sm hover:underline cursor-pointer" to={`/${path.HOME}`}>Go Home</Link>
                </div>
            </div>
        </div>
    )
}

export default Login