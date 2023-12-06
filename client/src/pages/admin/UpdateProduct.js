import { InputForm,Select,MarkdownEditor,Button } from 'components'
import React, { memo,useState,useEffect,useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { validate,fileToBase64 } from 'ultils/helpers'
import { toast } from 'react-toastify'
import { apiUpdateProduct } from 'apis'

const UpdateProduct = ({editProduct,render,setEditProduct}) => {
    const {categories} = useSelector (state =>state.app)
    const {register,handleSubmit,formState:{errors},reset,watch} = useForm()
    const [ payload,setPayload]=useState({
        description: ''
      })
    
    const [preview,setPreview] = useState({
        images: []
    })

    useEffect(() => {
          reset({
            title: editProduct?.title || '',
            price: editProduct?.price || '',
            quantity: editProduct?.quantity || '',
            color: editProduct?.color || '',
            category: editProduct?.category || '',
            brand: editProduct?.brand || '',
          });
          setPayload({description: typeof editProduct?.description === 'object' ? editProduct?.description?.join(',') : editProduct?.description})
          setPreview({images: editProduct?.images || []})
        }, [editProduct]);
      
    console.log(editProduct)
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
          imagesPreview.push(base64)
        }
        setPreview(prev =>({...prev,images:imagesPreview}))
        
    }
    useEffect(() => {
        if(watch('images') instanceof FileList && watch('images').length > 0 )
        handlePreviewImages(watch('images'))
      },[watch('images')])


      const handleUpdateProduct = async(data) => {
        const invalids = validate(payload,setInvalidFields)
        if(invalids===0){
          if(data.category) data.category = categories?.find(el => el.title === data.category)?.title
          const finalPayload = {...data,...payload}
          const formData = new FormData()
          for(let i of Object.entries(finalPayload)) formData.append(i[0],i[1])
          if(finalPayload.images){
            const images = finalPayload?.image?.length === 0 ? preview.images : finalPayload.images
            for(let image of images) formData.append('images',image)
          }
          const response =await apiUpdateProduct(formData,editProduct._id)
          
          if(response.success){
            toast.success(response.mes)
            render()
            setEditProduct(null)
            setPayload({images: []})
          }else toast.error(response.mes)
        } 
    
      }
  return (
    <div className='w-full flex flex-col gap-4 relative text-black'>
      <div className='h-[69px] w-full'></div>
      <div className='px-4 border-b left-[327px] bg-gray-100 flex justify-between items-center right-0 mt-5 fixed top-0'>
        <h1 className='text-3xl font-bold tracking-tight'>Update products</h1>
        <span onClick={() => setEditProduct(null)} className='text-main hover:underline cursor-pointer'>Cancel</span>
      </div>
      <div className='text-black p-4'>
        <form onSubmit={handleSubmit(handleUpdateProduct)}>
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
              options={categories?.map(el =>({code:el.title,value:el.title}))}
              register={register}
              id='category'
              validate={{required:'Need fill this field'}}
              style='flex-auto'
              errors={errors}
              fullWidth
              
              />
              <Select 
              label='Brand (Optional)'
              options={categories?.find(el =>el.title === watch('category'))?.brand?.map(el =>({code:el,value: el}))}
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
              value={payload.description}
            />
            <div className='flex flex-col gap-2 mt-8'>
              <label htmlFor='products' className='font-semibold'>Upload image of product</label>
              <input  
              type='file' 
              id='products'
              multiple
              {...register('images')} 
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

            <div className='my-6'><Button type='submit'>Update Product</Button></div>
        </form>
        </div>
    </div>
  )
}

export default memo(UpdateProduct)
