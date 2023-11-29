import React,{memo} from "react";
//import { apiGetCategories } from "../apis/app";
import {NavLink} from 'react-router-dom'
import {creatrSlug } from 'ultils/helpers'
import { useSelector } from "react-redux";


const Sidebar = () =>{
    const { categories} = useSelector(state => state.app)
    // const [categories,setCategories] = useState(null)
    // const fetchCategories = async() => {
        
    //     const response = await apiGetCategories()
    //     if(response.success) setCategories(response.ProductCategories)
    // }
    // useEffect( () => {
    //   fetchCategories()
    // },[])
    return (
        <div className="flex flex-col border">
          {categories?.map(el => {
            return (
              <NavLink
                key={creatrSlug(el.title)}
                to={creatrSlug(el.title)}
                className={({ isActive }) =>
                isActive ?'bg-main text-while px-5 pt-[15px] pb-[14px] text-sm hover:text-main' :'px-5 pt-[15px] pb-[14px] text-sm hover:text-main'
              }
              >
                {el.title}
              </NavLink>
            );
          })}
        </div>
      );
      
}

export default memo(Sidebar)