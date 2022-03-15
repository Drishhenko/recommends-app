const Router = require ('express')
const router = new Router()
const hashtagController = require('../controllers/hashtagController')
const authCheck = require('../check/authCheck')

router.post('/', authCheck, hashtagController.create)
router.get('/', hashtagController.getAll)


module.exports = router