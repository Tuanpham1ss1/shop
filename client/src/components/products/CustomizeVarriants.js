import { apiAddVarriant } from 'apis'
import Button from 'components/button/Button'
import InputForm from 'components/inputs/InputForm'
import React, { memo, useEffect,useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { fileToBase64 } from 'ultils/helpers'

const CustomizeVarriants = ({customizevarriant,setCustomizeVarriant,render}) => {
    const [preview,setPreview] = useState({
        images: []
      })
    const {register,handleSubmit,formState:{errors},reset,watch} = useForm()

    useEffect(() =>{
        reset({
            title:customizevarriant?.title,
            color:customizevarriant?.color,
            price:customizevarriant?.price,
        })
    },[customizevarriant])
    const handleAddVarriant =async (data) => {
        if(data.color === customizevarriant.color) Swal.fire('Oops!','Color not changed','info')
        else {
          const formData = new FormData()
          for(let i of Object.entries(data)) formData.append(i[0],i[1])
          if(data.images){
            for(let image of data.images) formData.append('images',image)
          }
        const response = await apiAddVarriant(formData,customizevarriant._id)
        if(response.success){
          toast.success(response.mes)
          reset()
          setPreview({images: []})
        }else toast.error(response.mes)
      }

    }

    const handlePreviewImages = async(files) => {
        
        const imagesPreview = []
        for(let file of files){
          if(file.type !== 'image/png' && file.type !== 'image/jpeg'){
            toast.warning('File not supperted!')
            return
          }
          const base64 = await fileToBase64(file)
          imagesPreview.push(base64)
        }
        setPreview(prev =>({...prev,images:imagesPreview}))
        
    }
    useEffect(() => {
        if(watch('images') instanceof FileList && watch('images').length > 0 )
        handlePreviewImages(watch('images'))
      },[watch('images')])
    return (
    <div className='w-full flex flex-col gap-4 relative text-black'>
      <div className='h-[69px] w-full'></div>
      <div className='px-4 border-b left-[327px] bg-gray-100 flex justify-between items-center right-0 mt-5 fixed top-0'>
        <h1 className='text-3xl font-bold tracking-tight'>Customize varriants of products</h1>
        <span 
        onClick={() => setCustomizeVarriant(null)} 
        className='text-main hover:underline cursor-pointer'>Back</span>
      </div>
      <form onSubmit={handleSubmit(handleAddVarriant)} className='p-4 w-full flex flex-col gap-4'>
        <div className='flex gap-4 items-center w-full'>
            <InputForm 
              label='Originnal name'
              register={register}
              errors={errors}
              id='title'
              fullWidth
              validate={{
                required : "Need fill this field"
              }}
              style='flex-auto'
              placeholder= 'Title of new product'
              />
        </div>
        <div className='flex gap-4 items-center w-full'>
            <InputForm 
              label='Price varriant'
              register={register}
              errors={errors}
              id='price'
              validate={{
                required : "Need fill this field"
              }}
              style='flex-auto'
              placeholder= 'Price of new varriant'
              fullWidth
              type='number'
              />
            <InputForm 
              label='Color varriant'
              register={register}
              errors={errors}
              id='color'
              validate={{
                required : "Need fill this field"
              }}
              style='flex-auto'
              placeholder= 'Color of new varriant'
              fullWidth
              />
        </div>
        <div className='flex flex-col gap-2 mt-8'>
              <label htmlFor='products' className='font-semibold'>Upload image of product</label>
              <input  
              type='file' 
              id='products'
              multiple
              {...register('images', { required: 'Need fill'})} 
               />
              {errors['images'] && <small className='text-xs text-red-500'>{errors['images']?.message}</small>}
            </div>
            {preview.images.length>0 && <div className='my-4 flex w-full gap-3 flex-wrap'>
               {preview.images?.map((el,indx) =>(
                <div
                key={indx} 
                className='w-fit relative'
                >
                  <img  src={el} alt='product' className='w-[200px] object-contain' />
                  </div>
               ))}
              </div>}

            <div className='my-6'><Button type='submit'>Add varriant</Button></div>
      </form>
    </div>
  )
}

export default memo(CustomizeVarriants)
