import React,{useState,useEffect, memo} from "react";
import {formatMoney,renderStarFromNumber} from 'ultils/helpers'
import icons from "ultils/icons";
import { apiGetProducts } from "apis/product";
import {Countdown } from 'components'

const {AiFillStar,FiMenu} = icons
let idInterval
const DeaDaily = () => {
    const [dealdaily ,setDealdaily] = useState(null)
    const [hour,setHour] =useState(0)
    const [minute,setMinute] =useState(0)
    const [second,setSecond] =useState(0)
    const [expireTime,setExpireTime] = useState(false)

    const fetchDealDaily = async () => {
        const respone = await apiGetProducts({limit:1, page:Math.round(Math.random())})
        if(respone.success) {
            setDealdaily(respone.products[0])
            const h =24-new Date().getHours()
            const m = 60-new Date().getMinutes()
            const s = 60-new Date().getSeconds()
            setHour(h)
            setMinute(m)
            setSecond(s)
        } else{
            setHour(0)
            setMinute(59)
            setSecond(59)
        }
    }
    useEffect(() => {
        idInterval && clearInterval(idInterval)
        fetchDealDaily()
    },[expireTime])
    
    useEffect(() => {
        idInterval = setInterval( ()=>{
            if(second>0) setSecond(prev => prev-1)
            else{
                if(minute>0){
                    setMinute(prev => prev -1)
                    setSecond(59)
                }else{
                    if(hour>0){
                        setHour(prev => prev -1)
                        setMinute(59)
                        setSecond(59)
                    }else{
                        setExpireTime(expireTime)
                    }
                }
            }
        },1000)
        return () => {
            clearInterval(idInterval)
        }
    },[second,minute,hour,expireTime])
    return (
        <div className="border w-full flex-auto">
            <div className="flex items-center justify-between p-4">
                <span className="flex-3 flex justify-center"><AiFillStar color="red"/></span>
                <span className="flex-4 font-semibold text-center text-gray-700">DAILY DEAL</span>
                <span className="flex-3"></span>
            </div>
            <div className="w-full flex flex-col items-center px-4 pt-8 gap-2">
                <img src={dealdaily?.images[0] || "http://www.sitech.co.id/assets/img/products/default.jpg"} alt="" className="w-full object-contain"/>
                <span className="flex h-4 ">{renderStarFromNumber(dealdaily?.totalRatings)}</span>
                    <span className="line-clamp-1 text-center">{dealdaily?.title}</span>
                    <span>{formatMoney(dealdaily?.price)} VND</span>
            </div>
            <div className="px-4 mt-8">
                <div className="flex justify-center gap-2 items-center mb-4">
                    <Countdown unit={'Hours'} number={hour}/>
                    <Countdown unit={'Minutes'} number={minute}/>
                    <Countdown unit={'Seconds'} number={second}/>
                </div>
                <button
                type="button"
                className="flex gap-2 items-center justify-center w-full bg-main hover:bg-gray-800 text-white font-medium py-2">
                    <FiMenu />
                    <span>Option</span>
                </button>
            </div> 
        </div>
    )
}

export default memo(DeaDaily)