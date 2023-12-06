import React,{useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom'
import {Login,Home,Public,Products,Services,DetailProduct,Blog,FAQ, FinalRegister,ResetPassword} from './pages/public'
import path from './ultils/path';
import { AdminLayout,ManageOrder,ManageProduct,CreateProducts,Dashboard, ManagaUser } from './pages/admin'
import {MemberLayout,Personal,History,MyCart,Wishlist} from './pages/member'
import  {getCategories } from './store/app/asuncActions'
import  {useDispatch,useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Modal} from './components'

function App() {
  const dispatch = useDispatch()
  const { isShowModal, modalChildren } = useSelector(state => state.app)
  useEffect(() => {
    dispatch(getCategories())
  },[])
  return (
    <div className="font-main relative">
      {isShowModal && <Modal>{modalChildren}</Modal>}
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.DETAIL_PRODUCT__CATEGORY__PID__TITLE} element={<DetailProduct />}/>
          <Route path={path.OUR_SERVICES} element={<Services />}/>
          <Route path={path.FAQ} element={<FAQ />}/>
          <Route path={path.BLOGS} element={<Blog />}/>
          <Route path={path.PRODUCTS} element={<Products />}/>
          <Route path={path.RESETPASSWORD} element={<ResetPassword />}/>
          <Route path={path.ALL} element= {<Home />}/>
        </Route>
        <Route path={path.ADMIN} element={<AdminLayout/>}>
          <Route path={path.DASBOARD} element= {<Dashboard />}/>
          <Route path={path.MANAGE_USER} element= {<ManagaUser />}/>
          <Route path={path.MANAGE_ORDER} element= {<ManageOrder />}/>
          <Route path={path.MANAGE_PRODUCT} element= {<ManageProduct />}/>
          <Route path={path.CREATE_PRODUCTS} element= {<CreateProducts />}/>
        </Route>
        <Route path={path.MEMBER} element={<MemberLayout/>}>
          <Route path={path.PERSONAL} element={<Personal />}/>
          <Route path={path.MY_CART} element={<MyCart id ='cart' />}/>
          <Route path={path.HISTORY} element={<History />}/>
          <Route path={path.WISHLIST} element={<Wishlist />}/>
        </Route>
        <Route path={path.FINALREGISTER} element={<FinalRegister />}/>
        <Route path={path.LOGIN} element={<Login />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
        {/* Same as */}
        <ToastContainer />
    </div>
  );
}

export default App;
