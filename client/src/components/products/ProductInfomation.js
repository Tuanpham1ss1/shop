import React,{memo,useState,useCallback} from 'react'
import { productInfoTab } from 'ultils/containts'
import { VoteBar,Button,VoteOption,Comment} from 'components'
import {renderStarFromNumber} from 'ultils/helpers'
import { apiRating } from 'apis'
import { useDispatch ,useSelector} from 'react-redux'
import {showmodal} from 'store/app/appSlice'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import path from 'ultils/path'

const ProductInfomation = ({totalRatings,ratings,nameProduct,pid,rerender}) => {
    const [activedTab,setActivedTab] = useState(1)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {isLoggedIn} = useSelector(state => state.user)

    const handleSubmitVoteOption = async ({comment,score}) => {
      if(!comment || !pid || !score){
        alert('Please vote when click submit')
        return
      }
      await apiRating({star:score,comment,pid,updatedAt: Date.now()})
      rerender()
      dispatch(showmodal({isShowModal:false,modalChildren:null}))
    }
    const handleVoteNow = () => {
      if (!isLoggedIn) {
        Swal.fire({
          text: 'Login to vote',
          cancelButtonText: 'Cancel',
          confirmButtonText:'Go login',
          title:'Oops!',
          showCancelButton: true,
        }).then((rs) =>{
          if(rs.isConfirmed) navigate(`/${path.LOGIN}`)
        })
      }
      else {
        dispatch(showmodal({
          isShowModal:true, modalChildren: <VoteOption  
          nameProduct={nameProduct}
          handleSubmitVoteOption={handleSubmitVoteOption}
          />}))
      }
    }
  return (
    <div>
      
      <div className='flex items-center gap-2 relative bottom-[-1px]'>
        {productInfoTab.map(el =>(
            <span 
            className={`py-2  px-4 cursor-pointer ${activedTab=== +el.id ? 'bg-white border border-b-0':'bg-gray-200'}`} 
            key={el.id}
            onClick={() => setActivedTab(el.id)}
            >{el.name}</span>
        ))}
        <div
              className={`py-2  px-4 cursor-pointer ${activedTab=== 5 ? 'bg-white border border-b-0':'bg-gray-200'}`} 
              onClick={() => setActivedTab(5)}>
              CUSTOMER REVIEW
            </div>
      </div>
            
        
      <div className='border w-full p-4'>
        {productInfoTab.some(el => el.id === activedTab) && productInfoTab.find(el => el.id === activedTab)?.content}   
      </div>
       <div className='flex flex-col py-8 w-main'>
          <div className='flex border'>
            <div className='flex-4 border flex-col flex items-center justify-center '>
              <span className='font-semibold text-3xl'>{`${totalRatings}/5`}</span>
              <span className='flex items-center gap-1'>{renderStarFromNumber(totalRatings)?.map((el,index) =>
                <span key = {index}>{el}</span>
              )}
              </span>
              <span className='text-sm'>
                {`${ratings?.length} reviewers and commentors`}
              </span>
            </div>
            <div className='flex-6 gap-2 flex-col p-4'>
              {Array.from(Array(5).keys()).reverse().map(el => (
                <VoteBar key={el}
                number={el+1}
                ratingTotal={ratings?.length}
                ratingCount={ratings?.filter(i => i.star === el+1)?.length}
                />
              ))}
            </div>
          </div>
          <div className='p-4 flex items-center justify-center text-sm flex-col gap-2'> 
              <span>Do you review?</span>
              <Button handlOnClick={handleVoteNow}
                >
                  Vote now
              </Button>
            </div>
            <div className='flex flex-col gap-4'>
              {ratings?.map(el => (
                <Comment 
                  key={el._id}
                  star={el.star}
                  updatedAt={el.updatedAt}
                  comment={el.comment}
                  name= {`${el.postedBy?.lastname} ${el.postedBy?.firstname}`}
                />
              ))}
              </div>
        </div>
    </div>
  )
}

export default memo(ProductInfomation)
