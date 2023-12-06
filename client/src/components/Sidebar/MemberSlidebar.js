import React, { memo,Fragment ,useState} from 'react'
import avatar from 'assets/avatar.png'
import { memberSlidebar } from 'ultils/containts'
import { NavLink,Link } from 'react-router-dom'
import clsx from 'clsx'
import {AiOutlineCaretDown,AiOutlineCaretRight} from 'react-icons/ai'
import { useSelector } from 'react-redux'

const activeStyle = 'px-4 py-2 flex items-center gap-2 text-gray-200 bg-gray-500'
const notActiveStyle = 'px-4 py-2 flex items-center gap-2 text-gray-200 hover:bg-gray-600 '

const MemberSlidebar = () => {
    const [actived , setActived] = useState([])
    const {current} =useSelector(state => state.user)
    const handleshowTabs = (tabId) => {
        if(actived.some(el => el === tabId)) setActived(prev => prev.filter(el => el !== tabId))
        else setActived(prev => [...prev,tabId])
    }

  return (
    <div className='bg-white h-full py-4 w-[250px] flex-none'>
      <div className='w-full flex flex-col items-center justify-center py-4'>
        <img src={current?.avatar || avatar} alt='Logo' className='w-16 h-16 object-cover'/>
        <small>{`${current?.lastname} ${current?.firstname}`}</small>
      </div>
      <div >
        {memberSlidebar.map(el => (
            <Fragment key={el.id}>
                {el.type === 'SINGLE' && <NavLink 
                to={el.path}
                className={({isActive}) =>clsx(isActive && activeStyle, !isActive && notActiveStyle)}
                >
                    <span>{el.icons}</span>
                    <span>{el.text}</span>
                    </NavLink>}
                    {el.type ==='PARENT' && <div onClick={() => handleshowTabs(+el.id)} className=' flex flex-col'>
                        <div className='flex items-center justify-between px-4 py-2 hover:bg-blue-100 cursor-pointer'>
                            <div className='flex items-center gap-2'>
                                <span>{el.icons}</span>
                                <span>{el.text}</span>
                            </div>
                            {actived.some(id =>id === el.id) ? <AiOutlineCaretRight />:<AiOutlineCaretDown />}
                        </div>
                       {actived.some(id =>id === +el.id) &&  <div className='flex flex-col '>
                            {el.submenu.map(item => (
                                <NavLink 
                                key={el.text} 
                                to={item.path}
                                onClick={e =>e.stopPropagation()}
                                className={({isActive}) =>clsx(isActive && activeStyle, !isActive && notActiveStyle,'pl-10')}
                                >
                                    {item.text}
                                </NavLink>
                            ))}
                        </div>}
                        </div>}
            </Fragment>
        ))}
      </div>
    </div>
  )
}

export default memo(MemberSlidebar)
