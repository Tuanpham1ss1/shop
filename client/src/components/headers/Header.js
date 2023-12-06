import React,{Fragment,memo, useEffect, useState} from "react";
import logo from 'assets/logo.png'
import icons from "ultils/icons";
import {Link} from 'react-router-dom'
import path from 'ultils/path'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from "store/user/userSlide";

const { HiPhone,MdEmail,FaRegUserCircle,GiShoppingBag } = icons
const Header = () =>{
    const {current} = useSelector(state => state.user)
    const [isShowOption ,setIsShowOption] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        const handleClickoutOptions = (e) => {
            const profile = document.getElementById('profile')
            if(!profile?.contains(e.target)){
                setIsShowOption(false)
            }

            
        }
        document.addEventListener('click',handleClickoutOptions)
        return () => {
            document.removeEventListener('click',handleClickoutOptions)
        }
    },[])
    return (
        
        <div className="w-main flex justify-between h-[110px] py-[35px] items-center">
            <Link to={`/${path.HOME}`}>
                <img src={logo} alt="logo" className="w-48 h-64 object-contain"/>
            </Link>
            <div className="flex text-[13px] ">
                <div className="flex flex-col px-6 border-r items-center">
                    <span className="flex gap-6 items-center">
                        <HiPhone color="red"/>
                        <span className="font-semibold">
                         (+1900) 000 8888
                        </span> 
                    </span>
                    <span> Mon-Sat 9:00AM - 8:00PM</span>
                </div>
                <div className="flex flex-col items-center px-6 border-r">
                    <span className="flex gap-6 items-center">
                        <MdEmail color="red"/>
                        <span className="font-semibold">
                         Admin123@gmail.com
                        </span> 
                    </span>
                    <span> Online Support 24/7</span>
                </div>
                {current && <Fragment>
                        <div className="cursor-pointer flex items-center justify-center gap-2 px-6 border-r">
                        <GiShoppingBag color="red" />
                        <span>0 item(s)</span>
                    </div>
                    <div 
                    className="cursor-pointer flex items-center justify-center px-6 gap-2 relative"
                    onClick={() => setIsShowOption(prev => !prev)}
                    id="profile"
                    > 
                        <FaRegUserCircle/>
                        <span>Profile</span>
                        {isShowOption && <div onClick={e =>e.stopPropagation()} className="absolute top-full flex-col flex left-[16px] bg-gray-100 py-2 border min-w-[100px]">
                            <Link className='p-2 hover:bg-sky-100 w-full' to={`/${path.MEMBER}/${path.PERSONAL}`}>
                                Personal
                                </Link>
                                {+current.role === 2001 && <Link className='p-2 hover:bg-sky-100 w-full' to={`/${path.ADMIN}/${path.DASBOARD}`}>
                                Admin workspace
                                </Link>}
                                <span onClick={() => dispatch(logout())}
                                className="p-2 w-full hover:bg-sky-100"
                                >
                                    Logout
                                </span>
                        </div>}
                    </div>
                    
                </Fragment>

                }
            </div>
        </div>
    )
}

export default memo(Header)