import React,{useRef,useEffect, memo} from 'react'
import icons from 'ultils/icons'

const {AiFillStar} = icons

const VoteBar = ({number,ratingCount,ratingTotal}) => {
    const percentRef = useRef()
    useEffect( () => {
        const percent = Math.round(ratingCount*100/ratingTotal)
        percentRef.current.style.cssText = `right: ${100-percent}%`
    },[ratingCount,ratingTotal])
  return (
    <div className='flex items-center gap-2 text-gray-500'>
      <div className='flex flex-1 items-center justify-center gap-1 text-sm'>
        <span>{number}</span>
        <AiFillStar color='orange' />
      </div>
      <div className='flex-7'>
        <div className='w-full h-[5px] bg-gray-200 relative rounded-l-full rounded-r-full'>
            <div ref={percentRef} className='absolute inset-0 bg-red-500 '></div>
        </div>
      </div>
      <div className='flex-3 flex justify-center text-rs text-400'>
        {`${ratingCount || 0} reviewers`}
      </div>
    </div>
  )
}

export default memo(VoteBar)
