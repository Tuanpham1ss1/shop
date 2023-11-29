import React, { useCallback, useEffect, useState } from 'react'
import { InputForm ,Select,Button,MarkdownEditor} from 'components'
import {  set, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { validate,fileToBase64 } from 'ultils/helpers'
import { toast } from 'react-toastify'
import { IoTrashBinSharp } from "react-icons/io5";
import { apiCreateProduct } from 'apis'

const CreateProducts = () => {
  const {categories} = useSelector (state =>state.app)
  const {register,formState: {errors},reset,handleSubmit,watch} = useForm()
  const [ payload,setPayload]=useState({
    descrition: ''
  })

  const [preview,setPreview] = useState({
    images: []
  })
  const [hoverElm,setHoverELm] = useState(null)
  const [invalidFields,setInvalidFields] = useState([])
  const changeValue = useCallback((e) => {
    setPayload(e)
  },[payload])
  const handlePreviewImages = async(files) => {
      const imagesPreview = []
      for(let file of files){
        if(file.type !== 'image/png' && file.type !== 'image/jpeg'){
          toast.warning('File not supperted!')
          return
        }
        const base64 = await fileToBase64(file)
        imagesPreview.push({name:file.name,path:base64})
      }
      setPreview(prev =>({...prev,images:imagesPreview}))
  }
useEffect(() => {
  handlePreviewImages(watch('images'))
},[watch('images')])
  const handleCreateProduct = async(data) => {
    const invalids = validate(payload,setInvalidFields)
    if(invalids===0){
      if(data.category) data.category = categories?.find(el => el._id === data.category)?.title
      console.log({...data,...payload})
      const finalPayload = {...data,...payload}
      const formData = new FormData()
      for(let i of Object.entries(finalPayload)) formData.append(i[0],i[1])
      const response =await apiCreateProduct(finalPayload)
    console.log(response)
    } 
  }
  const handleRemoveImage = (name) => {
    const files = [...watch('images')]
    reset({
      images: files?.filter(el => el.name !== name)
    })
    if(preview.images?.some(el => el.name === name)) setPreview(prev => ({...prev,images:prev.images?.filter(el => el.name !== name)}))
  }
  return (
    <div className='w-full'>
      <h1 className='h-[75px] text-black flex justify-between items-center text-3xl font-bold px-4 border-b'>
        <span>Create New product</span>
      </h1>
      <div className='text-black p-4'>
        <form onSubmit={handleSubmit(handleCreateProduct)}>
            <InputForm 
            label='Name product'
            register={register}
            errors={errors}
            id='title'
            validate={{
              required : "Need fill this field"
            }}
            fullWidth
            placeholder= 'Name of new product'
            />
            <div className='w-full flex my-6 gap-4'>
              <InputForm 
              label='Price'
              register={register}
              errors={errors}
              id='price'
              validate={{
                required : "Need fill this field"
              }}
              style='flex-auto'
              placeholder= 'Price of new product'
              type='number'
              fullWidth={true}
              />
              <InputForm 
              label='Quantity'
              register={register}
              errors={errors}
              id='quantity'
              validate={{
                required : "Need fill this field"
              }}
              style='flex-auto'
              placeholder= 'Quantity of new product'
              type='number'
              fullWidth={true}
              />
              <InputForm 
              label='Color'
              register={register}
              errors={errors}
              id='color'
              validate={{
                required : "Need fill this field"
              }}
              style='flex-auto'
              placeholder= 'Color of new product'
              fullWidth={true}
              />
            </div>
            <div className='w-full flex my-6 gap-4'>
              <Select 
              label='Category'
              options={categories?.map(el =>({code:el._id,value:el.title}))}
              register={register}
              id='category'
              validate={{required:'Need fill this field'}}
              style='flex-auto'
              errors={errors}
              fullWidth
              
              />
              <Select 
              label='Brand (Optional)'
              options={categories?.find(el =>el._id === watch('category'))?.brand?.map(el =>({code:el,value: el}))}
              register={register}
              id='brand'
              style='flex-auto'
              errors={errors}
              fullWidth
              />
            </div>
            <MarkdownEditor 
            name='description'
            changeValue={changeValue}
            label='Description'
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            />
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
                <div onMouseEnter={() =>setHoverELm(el.name)} 
                key={indx} 
                className='w-fit relative'
                onMouseLeave={() =>setHoverELm(null)}
                >
                  <img  src={el.path} alt='product' className='w-[200px] object-contain' />
                  {/* {hoverElm === el.name && <div className='absolute inset-0 bg-overlay flex items-center justify-center cursor-pointer'
                  onClick={() => handleRemoveImage(el.name)}
                  > 
                    <IoTrashBinSharp size={24} color='white'/>
                    </div>} */}
                  </div>
               ))}
              </div>}
            <div><Button  type='submit'>Create New Product</Button></div>
        </form>
        </div>
    </div>
  )
}

export default CreateProducts
