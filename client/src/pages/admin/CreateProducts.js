import React, { useCallback, useEffect, useState } from 'react'
import { InputForm ,Select,Button,MarkdownEditor} from 'components'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { validate,fileToBase64 } from 'ultils/helpers'
import { toast } from 'react-toastify'
import { apiCreateProduct } from 'apis'

const CreateProducts = () => {
  const {categories} = useSelector (state =>state.app)
  const {register,formState: {errors},reset,handleSubmit,watch} = useForm()
  const [ payload,setPayload]=useState({
    description: ''
  })

  const [preview,setPreview] = useState({
    images: []
  })
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
        imagesPreview.push({name: file.name,path :base64})
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
      const finalPayload = {...data,...payload}
      const formData = new FormData()
      for(let i of Object.entries(finalPayload)) formData.append(i[0],i[1])
      if(finalPayload.images){
        for(let image of finalPayload.images) formData.append('images',image)
      }
      const response =await apiCreateProduct(formData)
      if(response.success){
        toast.success(response.mes)
        reset()
        setPayload({images: []})
      }else toast.error(response.mes)
    } 

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
                <div  
                key={indx} 
                className='w-fit relative'
                >
                  <img  src={el.path} alt='product' className='w-[200px] object-contain' />
                  </div>
               ))}
              </div>}

            <div className='my-6'><Button type='submit'>Create New Product</Button></div>
        </form>
        </div>
    </div>
  )
}

export default CreateProducts
