import React,{Fragment,memo} from "react";
import logo from 'assets/logo.png'
import icons from "ultils/icons";
import {Link} from 'react-router-dom'
import path from 'ultils/path'
import { useSelector } from 'react-redux'

const { HiPhone,MdEmail,FaRegUserCircle,GiShoppingBag } = icons
const Header = () =>{
    const {current} = useSelector(state => state.user)
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
                    <Link 
                    className="cursor-pointer flex items-center justify-center px-6 gap-2"
                    to = {+current?.role === 2001 ? `/${path.ADMIN}/${path.DASBOARD}` : `/${path.MEMBER}/${path.PERSONAL}`}
                    > 
                        <FaRegUserCircle/>
                        <span>Profile</span>
                    </Link>
                </Fragment>

                }
            </div>
        </div>
    )
}

export default memo(Header)