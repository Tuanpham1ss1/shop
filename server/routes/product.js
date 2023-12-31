const router = require('express').Router()
const ctrls = require('../controllers/product')
const uploader = require('../config/cloudinary.config')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')



router.post('/', [verifyAccessToken, isAdmin],uploader.fields([{name:'images',maxCount:10}]),ctrls.createProduct)
router.get('/', ctrls.getProducts)
router.put('/ratings',verifyAccessToken,ctrls.ratings)



router.put('/varriant/:pid', [verifyAccessToken, isAdmin],uploader.fields([{name:'images',maxCount:10}]),ctrls.addVarriant)
router.put('/uploadimage/:pid', [verifyAccessToken, isAdmin],uploader.array('images',10), ctrls.uploadImagesProduct)
router.put('/:pid', [verifyAccessToken, isAdmin],uploader.fields([{name:'images',maxCount:10}]),ctrls.updateProduct)
router.delete('/:pid', [verifyAccessToken, isAdmin], ctrls.deleteProduct)
router.get('/:pid', ctrls.getProduct)


module.exports = router