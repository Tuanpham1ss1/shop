import React, {useCallback, useEffect,useState} from "react";
import { useParams } from "react-router-dom";
import { apiGetProduct,apiGetProducts } from "../../apis";
import {Breadcrumb,Button,ProductInfomation,SelectQuantity,CustomSlider} from '../../components'
import Slider from 'react-slick'
//import ReactImageMagnify from 'react-image-magnify';
import {formatMoney,formatPrice,renderStarFromNumber} from '../../ultils/helpers'
import DOMPurify from 'dompurify';
import clsx from "clsx";
import { current } from "@reduxjs/toolkit";

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
};

const DetailProduct = () => {
    const {pid,category} = useParams()
    const [product,setProduct] = useState(null)
    const [quantity,setQuantity] = useState(1)
    const [update, setUpdate] = useState(false)
    const [relatedProducts,setRelatedProducts] = useState(null)
    const [varriant,setVarriant] = useState(null)
    const [currentProduct,setCurrentProduct] = useState({
        title: '',
        images: [],
        price: '',
        color: '',
    })
    const fetchProductData = async () => {
        const respone = await apiGetProduct(pid)
        if(respone.success) {
            setProduct(respone.productData)
        }
    }
    const fetchProducts = async () => {
        const respone = await apiGetProducts({category})
        if(respone.success) setRelatedProducts(respone.products)
    }
    useEffect(() => {
        if(varriant){
            setCurrentProduct({
               title: product?.varriants?.find(el => el.sku ===varriant)?.title,
               color: product?.varriants?.find(el => el.sku ===varriant)?.color,
               images: product?.varriants?.find(el => el.sku ===varriant)?.images,
                price: product?.varriants?.find(el => el.sku ===varriant)?.price,
               
            })
        }
    })
    useEffect(() =>{
        if(pid){
            fetchProducts()
            fetchProductData()
        }
        window.scrollTo(0,0)
    },[pid])
    useEffect( () => {
        if(pid) fetchProductData()
    },[update])
    const rerender = useCallback(() => {
      setUpdate(!update)
    },[update])
    const handleQuantity = useCallback( (number) =>{
        if(!Number(number) || Number(number)<1) {
            return
        }else setQuantity(number)    
    },[quantity])
    const handleChangeQuantity = useCallback((flag) => {
        if(flag ==='minus' && quantity === 1) return
        if(flag ==='minus') setQuantity(prev => +prev-1)
        if(flag ==='plus') setQuantity(prev => +prev+1)
    },[quantity])
    return (
            <div className="w-full">
               <div className="h-[81px] flex justify-center items-center bg-gray-100">
                    <div className="w-main">
                        <h3 className="font-semibold">{currentProduct.title || product?.title}</h3>
                        <Breadcrumb title ={currentProduct.title || product?.title} category={category}/>
                    </div>
               </div>
               <div className="w-main m-auto mt-4 flex">
                    <div className="flex flex-col gap-4 w-2/5">
                        {/* <div className="h-[458px] w-[458px] border">
                            <ReactImageMagnify {...{
                                smallImage: {
                                    alt: 'Wristwatch by Ted Baker London',
                                    isFluidWidth: true,
                                    src: product?.images[0]
                                },
                                largeImage: {
                                    src: product?.images[0],
                                    width: 1200,
                                    height: 1800
                                }
                            }} />
                        </div> */}
                        <img src={product?.images[0]} alt="product" className="h-[458px] w-[458px] border object-cover"/>
                        <div className="w-[458px]">
                            <Slider className="image-slider flex gap-2" {...settings}>
                                {!currentProduct.images.length ===0 && product?.images?.map((el,index) => (
                                    <div  key={index} >
                                        <img src={el} alt='sub-product' className="h-[143px] w-[143px] border object-cover" />
                                    </div>
                                ))}
                                {currentProduct.images.length > 0 && currentProduct.images?.map((el,index) => (
                                    <div  key={index} >
                                        <img src={el} alt='sub-product' className="h-[143px] w-[143px] border object-cover" />
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>
                    <div className="w-2/5 pr-[24px] flex flex-col gap-4 ">
                        <div className="flex items-center justify-between">
                            <h2 className="text-[30px] font-semibold">{`${formatMoney(formatPrice(currentProduct.price || product?.price))} VND`}</h2>
                            <span className="text-sm text-main">
                                {`In stock: ${product?.quantity}`}
                            </span>
                        </div>
                        <div className="flex items-center gap-1 mt-4">
                            {renderStarFromNumber(product?.totalRatings)?.map((el,index) =>(<span key={index}>{el}</span>))}
                            <span className="text-sm text-main italic">{`(Sold: ${product?.sold} pieces)`}</span>
                        </div>
                        <ul className="text-sm text-gray-500 list-square pl-4">
                            {product?.description?.length > 1 && product?.description?.map(el => (<li className="leading-6"key={el}>{el}</li>))}
                            {product?.description?.length === 1 && <div className='text-sm line-clamp-[10] mb-8' dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(product?.description[0])}}></div>}
                        </ul>
                        <div className="my-4 flex gap-4">
                            <span className="font-bold">Color:</span>
                            <div className="flex flex-wrap gap-4 items-center w-full">
                                <div onClick={() => setVarriant(null)} 
                                className={clsx("flex items-center gap-2 p-2 border cursor-pointer", !varriant && 'border-red-500')}>
                                    <img src = {product?.images[0]} alt="thumb" className="w-8 h-8 rounded-md object-cover" />
                                    <span className="flex flex-col ">
                                        <span>{product?.color}</span>
                                        <span className="text-sm">{product?.price}</span>
                                    </span>
                                </div>
                                {product?.varriants?.map(el => (
                                    <div onClick={() => setVarriant(el.sku)} 
                                    className={clsx("flex items-center gap-2 p-2 border cursor-pointer",varriant === el.sku && 'border-red-500')}>
                                    <img src = {el?.images[0]} alt="thumb" className="w-8 h-8 rounded-md object-cover" />
                                    <span className="flex flex-col ">
                                        <span>{el?.color}</span>
                                        <span className="text-sm">{el?.price}</span>
                                    </span>
                                </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col gap-8">
                            <div className="flex items-center gap-4">
                                <span className="font-semibold">Quantity: </span>
                                <SelectQuantity quantity={quantity} handleQuantity={handleQuantity} handleChangeQuantity={handleChangeQuantity}/>
                            </div>
                            <Button fw>
                                Add to Cart
                            </Button>
                        </div>
                    </div>
                    <div className="w-1/5">
                    </div>
               </div>
               <div className="w-main m-auto mt-8">
                    <ProductInfomation 
                    totalRatings={product?.totalRatings} 
                    ratings={product?.ratings} 
                    nameProduct={product?.title}
                    pid = {product?._id}
                    rerender ={rerender}
                    />
               </div>
               <div>
                    <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">OTHER CUSTOMERS ALSO BUY:</h3>
                    <CustomSlider products={relatedProducts}/>
                </div>
               <div className="h-[100px] w-full"></div>
            </div>
    )
}

export default DetailProduct