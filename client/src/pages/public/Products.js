import React ,{useEffect,useState,useCallback}from "react";
import { useParams,useSearchParams,useNavigate,createSearchParams } from "react-router-dom";
import { Breadcrumb,Product ,SeachItem,InputSelects,Paginations} from "../../components";
import { apiGetProducts } from "../../apis";
import Masonry from 'react-masonry-css'
import { sorts } from "../../ultils/containts";

const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };
const Products = () => {
    const [products,setProducts] = useState(null)
    const [activeClick,setactiveClick] = useState(null)
    const [params] = useSearchParams()
    const [sort,setSort] = useState('')
    const navigate = useNavigate()
    const fetchProductsByCategory = async(queries) => {
        const respone = await apiGetProducts(queries)
        if(respone.success) setProducts(respone)
    }
    const { category } = useParams()
    useEffect( () => {
        let param = []
        for(let i of params.entries()) param.push(i)
        const queries = {}
        for (let i of params) queries[i[0]] = i[1]
        let priceQuery ={}
        if(queries.to && queries.from){
            priceQuery= { 
                $and:[
                {price:{gte: queries.from}} ,
                {price:{lte: queries.to}}
            ]}
            delete queries.price
        }
        if(queries.from) {
            queries.price = {gte: queries.from}
        }
        if(queries.to) {
            queries.price = {lte: queries.to}
         }
        delete queries.to
        delete queries.from
        
        const q = {...priceQuery,...queries}
        fetchProductsByCategory(q)
        window.scrollTo(0,0)
    },[params])
    const changeActiveFilter = useCallback( (name) =>{
        if(activeClick === name) setactiveClick(null)
        else return setactiveClick(name)
    },[activeClick])
    const changeValue = useCallback( (value) => {
        setSort(value)
    },[sort])
    useEffect( () => {
        if (sort){
            navigate({
                pathname: `/${category}`,
                search: createSearchParams({sort}).toString()
            })
        }
    },[sort])
    return (
            <div className="w-full text-base px-[10px]">
                <div className="h-[81px] flex justify-center items-center bg-gray-100">
                    <div className="w-main">
                        <h3 className="font-semibold uppercase">{category}</h3>
                        <Breadcrumb category={category}/>
                    </div>
               </div>
               <div>
               <div className="w-main border p-4 flex justify-between mt-8 m-auto">
                        <div className="w-4/5 flex-auto flex flex-col gap-3">
                            <span className='font-semibold text-sm'>Filter By</span>
                            <div className="flex items-center gap-4">
                                <SeachItem 
                                name='price'
                                activeClick={activeClick}
                                changeActiveFilter ={changeActiveFilter}
                                type="input"
                                />
                                <SeachItem 
                                name='color'
                                activeClick={activeClick}
                                changeActiveFilter ={changeActiveFilter}
                                type="checkbox"
                                />
                            </div>
                        </div>
                        <div className="w-1/5 flex flex-col gap-3">
                            <span className="font-semibold text-sm">Sort By</span>
                            <div className="w-full">
                                <InputSelects changeValue={changeValue} value ={sort} options ={sorts}/>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 w-main m-auto">
                    <Masonry
                        breakpointCols={3}
                        className="my-masonry-grid"
                        columnClassName="my-masonry-grid_column">
                            {products?.products?.map(el => (
                                <Product 
                                key={el._id} 
                                pid ={el.id}
                                productData ={el}
                                />
                            ))}
                        </Masonry>
                    </div>
               </div>
               <div className="w-main m-auto my-4 flex justify-end">
                    <Paginations totalCount={products?.counts}
                    
                    />
               </div>
               <div className="w-full h-[500px]"></div>
            </div>
    )
}

export default Products