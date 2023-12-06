import React,{useState,useEffect,memo} from "react";
import {ProductCards} from 'components'
import { apiGetProducts } from "apis";

const FeatureProduct = () => {
    const [products,setProducts] = useState(null)
    const fetchProducts = async () => {
        const respone = await apiGetProducts({limit:9,sort: '-totalRatings'})
        if(respone.success) setProducts(respone.products)
    }
    useEffect ( () =>{
        fetchProducts()
    },[])
    return (
        <div className="w-full">
           <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">FEATURE PRODUCTS</h3>
           <div className="flex flex-wrap mt-[15px] mx-[-10px]">
            { products && products?.map( el =>(
                <ProductCards 
                key = {el._id}
                image ={el.images[0]}
                title ={el.title}
                totalRatings = {el.totalRatings}
                price = { el.price}
                />
            ))}
           </div>
        </div>
    )
}
export default memo(FeatureProduct)