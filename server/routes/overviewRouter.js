const Router = require ('express')
const overviewController = require('../controllers/overviewController')
const router = new Router()
const authCheck = require('../check/authCheck')

router.post('/', authCheck, overviewController.create)
router.post('/overal-rating', overviewController.createRate)
router.get('/', overviewController.getAll)
router.get('/:id', overviewController.getOne)
router.delete('/', authCheck, overviewController.delete)

module.exports = router