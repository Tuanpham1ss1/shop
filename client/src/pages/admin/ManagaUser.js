import { apiDeleteUser, apiGetUsers ,apiUpdateUser} from 'apis'
import React, { useEffect, useState,useCallback } from 'react'
import { roles,blockStatus } from 'ultils/containts'
import moment from 'moment'
import { InputField ,InputForm,Paginations,Button, Select } from 'components'
import  useDebounce  from 'hooks/useDebounce'
import { useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import clsx from 'clsx'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

const ManagaUser = () => {
    const {handleSubmit,register,formState:{errors}} = useForm({
        email:'',
        firstname: '',
        lastname: '',
        role: '',
        phone : '',
        isBlocked: ''
    }) 
    const [users,setUsers] = useState(null)
    const [queries,setQueries] = useState({
        q : ""
    })
    const [update,setUpdate] = useState(false)

    const [editElm,setEditElm] = useState(null)
    const [params] = useSearchParams()
    const render = useCallback( () => {
        setUpdate(!update)
    },[update])
    const fetchUsers = async (params) => {
        const response = await apiGetUsers({...params,limit:process.env.REACT_APP_LIMIT})
        if(response.success) setUsers(response)
    }
    const queriesDerbounce = useDebounce(queries.q,800)
    useEffect( () =>{
        const queries = Object.fromEntries([...params])
        if(queriesDerbounce) queries.q = queriesDerbounce
        fetchUsers(queries)
    },[queriesDerbounce,params,update])
    useEffect(() => {
        fetchUsers()
    },[])
    const setValue = useCallback((value) => {
        setQueries(value)
    },[queries.q])
    const handelUpdate = async(data) => {
        const response = await apiUpdateUser(data,editElm._id)
        console.log(response)
        if(response.success) {
            setEditElm(null)
            render()
            toast.success(response.mes)
        }else toast.error(response.mes)
     }
    
    const handlDelete = async (uid) => {
        Swal.fire({
            title:'Are you sure',
            text:'Are you ready remove this user?',
            showCancelButton:true
        }).then(async(result) =>{
            if(result.isConfirmed){
                const response = await apiDeleteUser(uid)
                if(response.success){
                    render()
                    toast.success(response.mes)
                
                }else toast.error(response.mes)
            }
        })
        
    }
  return (
    <div className={clsx('w-full',editElm && 'pl-16')}>
      <h1 className='h-[75px] text-black flex justify-between items-center text-3xl font-bold px-4 border-b'>
        <span>Manage Users</span>
      </h1>
      <div className='w-full p-4 '>
        <div className='text-black flex justify-end py-4'>
            <InputField 
            value={queries.q}
            nameKey={'q'}
            setValue={setQueries}
            style ={'w500'}
            placeholder='search name or mail user...'
            isHideLabel
            />
        </div>
        <form onSubmit={handleSubmit(handelUpdate)}>
            {editElm && <Button type='submit'>Update</Button>}
            <table className='table-auto mb-6 text-left w-full '>
                <thead className="font-bold bg-gray-700 text-[13px] border border-blue-300 text-center">
                    <tr>
                        <th className='px-4 py-2'>#</th>
                        <th className='px-4 py-2'>Email address</th>
                        <th className='px-4 py-2'>Firstname</th>
                        <th className='px-4 py-2'>Lastname</th>
                        <th className='px-4 py-2'>Role</th>
                        <th className='px-4 py-2'>Phone</th>
                        <th className='px-4 py-2'>Status</th>
                        <th className='px-4 py-2'>createa At</th>
                        <th className='px-4 py-2'>Actions</th>
                    </tr>
                </thead>
                <tbody className='text-black '>
                    {users?.users?.map((el,idx) =>(
                            <tr key={el._id} className='border border-gray-500'>
                            <td className='py-2 px-4'>{idx+1}</td>
                            <td className='py-2 px-4'>{
                            editElm?._id === el._id ? <InputForm 
                            register={register} 
                            fullWidth 
                            errors={errors} 
                            defaultValue={editElm?.email} 
                            id={'email'} 
                            validate={{
                                required:'Require fill.',
                                pattern: { 
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "invalid email address"
                                }
                            }}
                            />:<span>{el.email}</span>
                            }</td>
                            <td className='py-2 px-4'>{
                                editElm?._id === el._id ? <InputForm 
                                register={register} 
                                fullWidth 
                                errors={errors} 
                                defaultValue={editElm?.firstname} 
                                id={'firstname'} 
                                validate={{required:'Require fill.'}} 
                                />:<span>{el.firstname}</span>
                            }</td>
                            <td className='py-2 px-4'>{
                                editElm?._id === el._id ? <InputForm 
                                register={register} 
                                fullWidth 
                                errors={errors} 
                                defaultValue={editElm?.lastname} 
                                id={'lastname'} 
                                validate={{required:'Require fill.'}} 
                                />:<span>{el.lastname}</span>
                            }</td>
                            <td className='py-2 px-4'>{
                            editElm?._id === el._id ? <Select
                                register={register} 
                                fullWidth 
                                errors={errors} 
                                defaultValue={el.role}
                                id={'role'} 
                                validate={{required:'Require fill.'}}
                                options={roles}
                            />:<span>{roles.find(role =>+role.code === +el.role)?.value}</span>}</td>
                            <td className='py-2 px-4'>{
                                editElm?._id === el._id ? <InputForm 
                                register={register} 
                                fullWidth 
                                errors={errors} 
                                defaultValue={editElm?.mobile} 
                                id={'mobile'} 
                                validate={{required:'Require fill.',
                                pattern: {
                                    value: /^[62|0]+\d{9}/gi,
                                    message: "invalid phone number"
                                }        
                            }}
                                />:<span>{el.mobile}</span>
                            }</td>
                            <td className='py-2 px-4'>{
                                editElm?._id === el._id ? <Select
                                register={register} 
                                fullWidth 
                                errors={errors} 
                                defaultValue={el.isBlocked} 
                                id={'isBlocked'} 
                                validate={{required:'Require fill.'}}
                                options={blockStatus}
                            />:<span>{el.isBlocked ? 'Blocke':'Active'}</span>}</td>
                        
                            <td className='py-2 px-4'>{moment(el.updatedAt).format('DD/MM/YYYY')}</td>
                            <td className='py-2 px-4'>
                                {editElm?._id === el._id ? <span onClick={() =>setEditElm(null)} className='px-2 text-orange-600 hover:underline cursor-pointer'>Back</span>
                                :<span onClick={() =>setEditElm(el)} className='px-2 text-orange-600 hover:underline cursor-pointer'>Edit</span>}
                                <span onClick={() => handlDelete(el._id)} className='px-2 text-orange-600 hover:underline cursor-pointer'>Delete</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </form>
        <div className='w-full flex justify-end text-black'>
            <Paginations totalCount={users?.counts}/>
        </div>
      </div>
      
    </div>
  )
}

export default ManagaUser
