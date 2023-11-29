import React, { memo, useEffect } from 'react'
import usePaginations from 'hooks/usePaginations'
import { PageItem } from 'components'
import { useSearchParams } from 'react-router-dom'

const Paginations = ({totalCount}) => {
  const [params] = useSearchParams()
  const paginations = usePaginations(totalCount,params.get('page') || 1)

  const range = () => {
    const currentPage = +params.get('page')
    const pageSize =+process.env.REACT_APP_LIMIT || 6
    const start = ((currentPage-1)* pageSize) +1
    const end = Math.min(currentPage * pageSize,totalCount)
    return `${start}- ${end}`
  }
    return (
      <div className='flex w-full justify-between items-center'>
        {!+params.get('page') && <span className='text-sm italic'>{`Show products 1- ${Math.min(+process.env.REACT_APP_LIMIT,totalCount) || 6} of ${totalCount}`}</span>}
        {+params.get('page') && <span className='text-sm italic'>{`Show products  ${range()} of ${totalCount}`}</span>}
        <div className='flex items-center'>
          {paginations?.map(el =>(
            <PageItem key={el}>
              {el}
            </PageItem>
          ))}  
        </div>
      </div>

  )
}

export default memo(Paginations)
