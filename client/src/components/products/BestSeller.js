import React,{memo, useEffect,useState}from "react";
import { apiGetProducts } from "apis/product";
import {CustomSlider} from 'components'; 
import { useDispatch,useSelector } from "react-redux";
import { getNewProducts } from "store/products/asyncActions";


const tab = [
    {id:1,name:"best sellers"},
    {id:2,name:" new arrivals"},
]

const BestSeller = () => {
    const [bestSellers,setBestSellers] = useState(null)
    const [activedTab,setActivedTab] = useState(1)
    const [products,setProducts] = useState(null)
    const dispatch = useDispatch()
    const { newProducts } = useSelector(state => state.products)
    const fetchProducts = async () => {
        const response = await apiGetProducts({sort: '-sold'})
        if(response.success) {
          setBestSellers(response.products)
          setProducts(response.products)
        }
    }
    useEffect(() => {
        fetchProducts()
        dispatch(getNewProducts())
      }, [])
      useEffect(() => {
        if(activedTab ===1 ) setProducts(bestSellers)
        if(activedTab ===2 ) setProducts(newProducts)
      }, [activedTab])
      return (
        <div>
          <div className="flex text-[20px] gap-8 pb-4 border-b-2 border-main">
            {tab.map(el => (
              <span
                key={el.id}
                className={`font-semibold capitalize border-r cursor-pointer text-gray-400 ${activedTab === el.id ? 'text-red-500' : ''}`}
                onClick={() => setActivedTab(el.id)}
              >
                {el.name}
              </span>
            ))}
          </div>
          <div className="mt-4 mx-[-10px] " >
            <CustomSlider products={products} activedTab={activedTab}/>
          </div>
          <div className="w-full flex gap-4 mt-8">
            <img src='https://www.candere.com/media/catalog/category/Gold-Mobile1.jpg' alt='banner' className="flex-1 object-contain border border-box " style={{ width: '50%', height: 'auto' }} />
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO37VkPiI6hLUCiKFYB1bGt3-uzS40bV0PNw&usqp=CAU' alt='banner' className="flex-1 object-contain border border-box" style={{ width: '50%', height: 'auto' }} />
          </div>


        </div>
      )
      
}

export default memo(BestSeller)