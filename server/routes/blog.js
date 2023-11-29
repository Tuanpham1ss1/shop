const router = require('express').Router()
const ctrls = require('../controllers/blog')
const uploader = require('../config/cloudinary.config')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.post('/',[verifyAccessToken,isAdmin],ctrls.createNewBlog)
router.get('/',ctrls.getBlogs)
router.get('/one/:bid',ctrls.getBlog)
router.put('/like/:bid',[verifyAccessToken],ctrls.likeBlog)
router.put('/dislike/:bid',[verifyAccessToken],ctrls.dislikeBlog)
router.put('/:bid',[verifyAccessToken,isAdmin],ctrls.updateBlog)
router.delete('/:bid',[verifyAccessToken,isAdmin],ctrls.deleteBlog)
router.put('/image/:bid',[verifyAccessToken,isAdmin],uploader.single('image'),ctrls.uploadImagesBlog)

module.exports = router