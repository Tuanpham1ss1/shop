import React, { memo, useEffect, useState } from 'react'
import { color } from 'ultils/containts'
import icons from 'ultils/icons'
import { createSearchParams, useNavigate, useParams,useSearchParams } from 'react-router-dom'
import { apiGetProducts } from 'apis'
import useDebounce from 'hooks/useDebounce'

const { AiOutlineDown} = icons
const SeachItem = ({name,activeClick,changeActiveFilter, type ='checkbox'}) => {
    const navigate = useNavigate()
    const {category} = useParams()
    const [params] = useSearchParams()
    const [selected, setSelected] = useState([])
    const [bestPrice,setBestPrice] = useState(null)
    const [price ,setPrice] = useState({
        from : '',
        to : '',
    })
    const handleSelect = (e) => {
        const alreadyEL = selected.find(el => el === e.target.value)
        if(alreadyEL) setSelected(prev =>prev.filter(el => el !== e.target.value))
        else setSelected(prev => [...prev, e.target.value])
        changeActiveFilter(null)
    }
    useEffect( () => {
        if (selected.length > 0) {
            let param = []
            for(let i of params.entries()) param.push(i)
            const queries = {}
            for(let i of param) queries[i[0]] =i[1]
            queries.color = selected.join(',')
            queries.page = 1
            navigate({
                pathname: `/${category}`,
                search: createSearchParams(queries).toString()
            })
        } else {
            navigate(`/${category}`)
        }
    },[selected])

    useEffect( () => {
        if(price.from && price.to && price.from > price.to) alert('From price cannot greater than to price')
    },[price])

    const debouncePriceFrom = useDebounce(price.from,500)
    const deboucePriceTo = useDebounce(price.to,500)
    useEffect( () => {
        const data = {}
        if(Number(price.from) > 0) data.from = price.from
        if(Number(price.to) > 0 ) data.to = price.to
        navigate({
            pathname: `/${category}`,
            search: createSearchParams({data}).toString()
        })
    },[debouncePriceFrom,deboucePriceTo])
    
    const fetchBestPriceProduct = async () =>{
        const respone = await apiGetProducts({sort: '-price', limit : 1})
        if(respone.success) setBestPrice(respone.products[0]?.price)
    }
    useEffect( () => {
        if (type === 'input') fetchBestPriceProduct()
    },[type])

    return (
    <div 
    className='p-3 text-xs text-gray-500 border gap-6 cursor-pointer relative border-gray-800 flex justify-between items-center'
    onClick={() => changeActiveFilter(name)}
    >
        <span className='capitalize'>{name}</span>
        <AiOutlineDown/>
        {activeClick === name && <div className='absolute z-10 top-[calc(100%+1px)] left-0 w-fit p-4 border bg-white min-w-[150px]'>
            {type=== 'checkbox' && <div className='p-2'>
                <div className='p-4 items-center flex justify-between gap-8'>
                    <span className='whitespace-nowrap'>{`${selected.length} selected`}</span>
                    <span onClick={e =>{
                        e.stopPropagation()
                        setSelected([])
                    }} className='underline hover:text-main cursor-pointer'>Reset</span>
                </div>
                <div onClick={e =>e.stopPropagation()} className='flex flex-col gap-3'> 
                    {color.map((el,index) => (
                        <div className='flex items-center gap-4'>
                            <input type='checkbox' key={index} value={el} onClick={handleSelect} id={el} checked = {selected.some(selectedItem =>selectedItem ===el)}/>
                            <label className='capitalize text-gray-700' htmlFor={el}>{el}</label>
                        </div>
                    ))}
                    </div>
            </div>}
            {type === 'input' && <div onClick={e => e.stopPropagation()}>
                <div  className='p-4 items-center flex justify-between gap-8'>
                    <span className='whitespace-nowrap'>{`The highest price is ${Number(bestPrice).toLocaleString()} VND`}</span>
                    <span onClick={e =>{
                        e.stopPropagation()
                        setPrice({from : '',to:''})
                        changeActiveFilter(null)
                    }} className='underline hover:text-main cursor-pointer'>Reset</span>
                </div>
                <div className='flex items-center p-2 gap-2'>
                    <div className='flex items-center gap-2'>
                        <label htmlFor='from'>From</label>
                        <input className='form-input' 
                        type='number' 
                        id='from'
                        value={price.from} 
                        onChange={e => setPrice(prev => ({...prev,from: e.target.value}))} />
                    </div>
                    <div className='flex items-center gap-2'>
                        <label htmlFor='to'>To</label>
                        <input className='form-input' 
                        type='number' 
                        id='to'  
                        value={price.to} 
                        onChange={e => setPrice(prev => ({...prev,to: e.target.value}))}
                            />
                    </div>
                </div>
            </div>}
        </div>}
    </div>
  )
}

export default memo(SeachItem)
