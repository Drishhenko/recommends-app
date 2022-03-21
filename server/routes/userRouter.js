const Router = require ('express')
const userController = require('../controllers/userController')
const router = new Router()

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/:id', userController.getOne)
router.get('/', userController.getAll)

module.exports = router