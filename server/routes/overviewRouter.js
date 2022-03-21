const Router = require ('express')
const overviewController = require('../controllers/overviewController')
const router = new Router()

router.post('/', overviewController.create)
router.post('/overal-rating', overviewController.createRate)
router.get('/', overviewController.getAll)
router.get('/:id', overviewController.getOne)
router.delete('/', overviewController.delete)

module.exports = router