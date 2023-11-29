import React,{useState,memo} from "react";
import {formatMoney,renderStarFromNumber} from 'ultils/helpers'
import { SelectOption } from "components";
import icons from "ultils/icons";
import { Link } from "react-router-dom";


const {FaEye,FiMenu,FaHeart} = icons

const Product = ({productData}) => {
    const [isShowOption,setIsShowOption] = useState(false)
    return (
        <div className="w-full text-base px-[10px]"> 
            <Link
            className="w-full border p-[15px] flex flex-col items-center"
            to={`/${productData?.category?.toLowerCase()}/${productData?._id}/${productData?.title}`}
            onMouseEnter={e => {
                e.stopPropagation()
                setIsShowOption(true)
            }}
            onMouseLeave={e =>{
                e.stopPropagation()
                setIsShowOption(false)
            }}>
                <div className="w-full relative"> 
                {isShowOption && <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 animate-slide-top">
                    <SelectOption icons ={<FaEye />}/>
                    <SelectOption icons ={<FiMenu />}/>
                    <SelectOption icons ={<FaHeart />}/>
                </div>}
                <img src={productData?.images[0] || "http://www.sitech.co.id/assets/img/products/default.jpg"} alt="" className="w-[274px] h-[274px] object-cover"/>
                </div>
                <div className="flex flex-col gap-1 mt-[15px] items-start gap-1 w-full">
                    <span className="flex h-4">{renderStarFromNumber(productData?.totalRatings)?.map((el,index) =>(
                        <span key={index}>{el} </span>
                        ))}</span>
                    <span className="line-clamp-1">{productData?.title}</span>
                    <span>{formatMoney(productData?.price)} VND</span>
                </div>
            </Link>
        </div>
        
    )
}

export default memo(Product)
