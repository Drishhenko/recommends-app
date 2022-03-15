const Router = require ('express')
const router = new Router()
const typeController = require('../controllers/typeController')
const authCheck = require('../check/authCheck')

router.post('/', authCheck, typeController.create)
router.get('/', typeController.getAll)
router.delete('/', authCheck, typeController.delete)

module.exports = router