const { json, response, request } = require('express')
const Product = require('../models/product')
const asyncHandler = require('express-async-handler')
const slugify = require('slugify')

const createProduct = asyncHandler(async (req, res) => {
    const {title,price,description,brand,category,color} = req.body
    const images = req.files
    if(!(title && price && description && brand && category && color)) throw new Error('Missing inputw')
    req.body.slug = slugify(title)
    const newProduct = await Product.create(req.body)
    return res.status(200).json({
        success: newProduct ? true : false,
        createdProduct: newProduct ? newProduct : 'Không thể tạo mới sản phẩm'
    })
})
const getProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params
    const product = await Product.findById(pid).populate({
        path: 'ratings',
        populate: {
            path: 'postedBy',
            select: 'firstname lastname avatar'
        }
    })
    return res.status(200).json({
        success: product ? true : false,
        productData: product ? product : 'Không thể lấy sản phẩm'
    })
})
// Filtering, sorting & pagination
const getProducts = asyncHandler(async (req, res) => {
    const queries = { ...req.query }
    
    const excludeFields = ['limit', 'sort', 'page', 'fields']
    
    excludeFields.forEach((el) => delete queries[el])

    
    let queryString = JSON.stringify(queries)
    queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, (matchEl) => '$' + matchEl)
    const formatedQueries = JSON.parse(queryString)
    let colorQueryObject 
    // Filtering
    if (queries?.title) formatedQueries.title = { $regex: queries.title, $options: 'i' }
    if(queries?.category) formatedQueries.category = { $regex: queries.category, $options: 'i' }
    if(queries?.color) {
        delete formatedQueries.color
        const colorArr = queries.color?.split(',')
        const colorQuery = colorArr.map(el => ({ color : {$regex:el, $options: 'i'}}))
        colorQueryObject = {$or : colorQuery}
    }
    const q = {...colorQueryObject,...formatedQueries}
    let queryCommand = Product.find(q);
    //sorting
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ')
        queryCommand = queryCommand.sort(sortBy)
    }
    //Fields limiting
     if( req.query.fields){
        const fields = req.query.fields.split(",").join(" ")
        queryCommand=queryCommand.select(fields)
     }
    //pagination
    const page = +req.query.page || 1
    const limit = +req.query.limit || process.env.LIMIT_PRODUCTS 
    const skip = (page - 1) * limit
    queryCommand.skip(skip).limit(limit)
    //execute query

    queryCommand.then(async (response) => {
        const counts = await Product.find(q).countDocuments()
        return res.status(200).json({
            success: response ? true : false,
            counts,
            products: response ? response : 'Cannot get products',
        })
    })
    .catch((err) => {
        return res.status(500).json({
            success: false,
            error: err.message,
          })
    })
})
const updateProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params
    if (req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const updatedProduct = await Product.findByIdAndUpdate(pid, req.body, { new: true })
    return res.status(200).json({
        success: updatedProduct ? true : false,
        updatedProduct: updatedProduct ? updatedProduct : 'Cannot update product'
    })
})
const deleteProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params
    const deletedProduct = await Product.findByIdAndDelete(pid)
    return res.status(200).json({
        success: deletedProduct ? true : false,
        deletedProduct: deletedProduct ? deletedProduct : 'Cannot delete product'
    })
})
const ratings = asyncHandler(async (req,res) => {
    const { _id } = req.user
    const { star, comment, pid , updatedAt} = req.body
    if(!star || !pid) throw new Error('Missing inputs')
    const ratingProduct = await Product.findById(pid)
    const alRatings = ratingProduct?.ratings?.find(el => el.postedBy.toString() === _id)
    if (alRatings){
        await Product.updateOne({
            ratings: { $elemMatch: alRatings}
        },{
            $set: {
                "ratings.$.star":star,"ratings.$.comment":comment,"ratings.$.updatedAt":updatedAt
            }
        },{new : true})
    }else{
        await Product.findByIdAndUpdate(pid, {
            $push: { ratings :{star,comment,postedBy: _id,updatedAt}}
        },{new: true})
    }
    const updatedProduct = await Product.findById(pid)
    const ratingCount = updatedProduct.ratings.length
    const sumRatings = updatedProduct.ratings.reduce((sum,el) =>sum + +el.star,0)
    updatedProduct.totalRatings = Math.round(sumRatings * 10/ratingCount) / 10
    await updatedProduct.save()
    return res.status(200).json({
        status:true,
        updatedProduct
    })
})
const uploadImagesProduct = asyncHandler (async (req,res) => {
    const { pid } = req.params 
    if(!req.files) throw new Error('Missing inputs')
    const response = await Product.findByIdAndUpdate(pid, { $push: {images: { $each: req.files.map(el => el.path) } } },{new: true} )
    return res.status(200).json({
        status:response ? true : false,
        updatedProduct : response ? response : 'Cannot upload images product'
    })
})
module.exports = {
    createProduct,
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    ratings,
    uploadImagesProduct
}