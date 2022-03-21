const Router = require ('express')
const userController = require('../controllers/userController')
const router = new Router()
const authCheck = require('../check/authCheck')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authCheck, userController.check)
router.get('/:id', userController.getOne)
router.get('/', userController.getAll)

module.exports = router