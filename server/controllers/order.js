const { response } = require('express')
const Order = require('../models/order')
const User = require('../models/user')
const Coupon = require('../models/coupon')
const asynHandler = require('express-async-handler')
const createOrder = asynHandler(async(req,res) =>{
    const { _id } = req.user 
    const { coupon } = req.body
    const userCart = await User.findById(_id).select('cart').populate('cart.product','title price')
    const products = userCart?.cart?.map(el => ({
        product: el.product._id,
        count : el.quantity,
        color : el.color,
    }))
    let total = userCart?.cart?.reduce((sum,el) => el.product.price * el.quantity + sum,0)
    const createData ={ products, total, orderBy : _id}
    if (coupon){
        const couponData = await Coupon.findById(coupon)
        total = Math.round(total *(1- +couponData?.discount/100)/1000)*1000 || total
        createData.total = total
        createData.coupon = coupon
    }
    const rs = await Order.create(createData)
    return res.json({
        success: rs ? true : false,
        rs : rs ? rs : ' Something went wrong'
    })
})
const updateStatus = asynHandler(async(req,res) =>{
    const { oid} = req.params
    const {status} = req.body
    if(!status) throw new Error('Missing status')
    const response = await Order.findByIdAndUpdate(oid,{status},{new : true})
    return res.json({
        success: response ? true : false,
        rs : response ? response : ' Something went wrong'
    })
})
const getUserOrder = asynHandler(async(req,res) =>{
    const { _id} = req.user
    const response = await Order.find({orderBy:_id})
    return res.json({
        success: response ? true : false,
        rs : response ? response : ' Something went wrong'
    })
})
const getOrders = asynHandler(async(req,res) =>{
    const response = await Order.find()
    return res.json({
        success: response ? true : false,
        rs : response ? response : ' Something went wrong'
    })
})
module.exports = {
    createOrder,
    updateStatus,
    getUserOrder,
    getOrders
}