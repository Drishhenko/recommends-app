const Router = require ('express')
const router = new Router()
const hashtagController = require('../controllers/hashtagController')

router.post('/', hashtagController.create)
router.get('/', hashtagController.getAll)


module.exports = router