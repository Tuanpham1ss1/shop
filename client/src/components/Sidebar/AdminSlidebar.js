import React, { memo,Fragment ,useState} from 'react'
import logo from 'assets/logo.png'
import { adminSlidebar } from 'ultils/containts'
import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
import {AiOutlineCaretDown,AiOutlineCaretRight} from 'react-icons/ai'

const activeStyle = 'px-4 py-2 flex items-center gap-2 text-gray-200 bg-gray-500'
const notActiveStyle = 'px-4 py-2 flex items-center gap-2 text-gray-200 hover:bg-gray-600 '

const AdminSlidebar = () => {
    const [actived , setActived] = useState([])
    const handleshowTabs = (tabId) => {
        if(actived.some(el => el === tabId)) setActived(prev => prev.filter(el => el !== tabId))
        else setActived(prev => [...prev,tabId])
    }

  return (
    <div className='bg-zinc-800 h-full py-4'>
      <div className='flex flex-col justify-center items-center p-4 gap-2'>
        <img src={logo} alt='Logo' className='w-[200px] object-contain'/>
        <small>Admin Workspace</small>
      </div>
      <div>
        {adminSlidebar.map(el => (
            <Fragment key={el.id}>
                {el.type === 'SINGLE' && <NavLink 
                to={el.path}
                className={({isActive}) =>clsx(isActive && activeStyle, !isActive && notActiveStyle)}
                >
                    <span>{el.icons}</span>
                    <span>{el.text}</span>
                    </NavLink>}
                    {el.type ==='PARENT' && <div onClick={() => handleshowTabs(+el.id)} className=' flex flex-col text-gray-200'>
                        <div className='flex items-center justify-between px-4 py-2 hover:bg-gray-600 cursor-pointer'>
                            <div className='flex items-center gap-2'>
                                <span>{el.icons}</span>
                                <span>{el.text}</span>
                            </div>
                            {actived.some(id => el.id) ? <AiOutlineCaretRight />:<AiOutlineCaretDown />}
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

export default memo(AdminSlidebar)
