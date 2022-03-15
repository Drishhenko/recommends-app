const Router = require ('express')
const router = new Router()
const userRouter = require('./userRouter')
const typeRouter = require('./typeRouter')
const overviewRouter = require('./overviewRouter')
const hashtagRouter = require('./hashtagRouter')


router.use('/user', userRouter )
router.use('/type', typeRouter)
router.use('/overview', overviewRouter)
router.use('/hashtag', hashtagRouter)

module.exports = router