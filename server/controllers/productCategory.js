const ProductCategory = require('../models/productCategory')
const asyncHandler = require('express-async-handler')

const createCategory = asyncHandler(async (req,res) =>{
    const response = await ProductCategory.create(req.body)
    return res.json({
        success:response ? true : false,
        createCategory : response ? response: 'Cannot create new product Category'
    })
})
const getCategories = asyncHandler(async (req,res) =>{
    const response = await ProductCategory.find()
    return res.json({
        success:response ? true : false,
        ProductCategories : response ? response: 'Cannot get product Category'
    })
})
const updateCategory = asyncHandler(async (req,res) =>{
    const {pcid} = req.params
    const response = await ProductCategory.findByIdAndUpdate(pcid,req.body,{new : true})
    return res.json({
        success:response ? true : false,
        updateCategory : response ? response: 'Cannot update product Category'
    })
})
const deleteCategory = asyncHandler(async (req,res) =>{
    const {pcid} = req.params
    const response = await ProductCategory.findByIdAndDelete(pcid)
    return res.json({
        success:response ? true : false,
        deleteCategory : response ? response: 'Cannot delete product Category'
    })
})
module.exports = {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory
}