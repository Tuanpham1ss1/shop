import {useMemo} from 'react'
import { generatRange } from '../ultils/helpers'
import { HiDotsHorizontal } from "react-icons/hi";

const usePaginations = (totalProductCount,currentPage,siblingCount = 1) => {
    const paginationArray = useMemo(() => {
        const pageSize = process.env.REACT_APP_LIMIT || 6
        const paginationCount = Math.ceil(totalProductCount / pageSize)
        const totalPaginationItem = siblingCount + 5

        if(paginationCount <= totalPaginationItem) return generatRange(1,paginationCount)
        
        const isShowLeft = currentPage - siblingCount > 2
        const isShowRight = currentPage + siblingCount < paginationCount -1

        if(isShowLeft && !isShowRight){
            const rightStart = paginationCount-4
            const rightRange = generatRange(rightStart,paginationCount)

            return [1,<HiDotsHorizontal/>,...rightRange]
        }
        if(!isShowLeft && isShowRight){
            const leftRange =generatRange(1,5)

            return [...leftRange,<HiDotsHorizontal/>,paginationCount]
        }
        const siblingLeft = Math.max(currentPage -siblingCount,1)
        const siblingRight = Math.min(currentPage+siblingCount,paginationCount)

        if(isShowLeft && isShowRight){
            const middleRange = generatRange(siblingLeft,siblingRight)

            return [1,<HiDotsHorizontal/>,...middleRange,<HiDotsHorizontal/>,paginationCount]
        }

    },[totalProductCount,currentPage,siblingCount])
    
  
    return paginationArray
}

export default usePaginations
