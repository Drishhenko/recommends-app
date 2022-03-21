const uuid = require('uuid')
const path = require('path')
const { Overview, Images, Rating, Comments } = require("../models")
const ApiError = require('../ApiError')


class OverviewController {
    async create(req, res) {
        let {name, text, typeId, userId, rating} = req.body
        let img = req.files
        const overview = await Overview.create({name, text, rating, typeId, userId})
       
        if(img) {
             Object.values(img).flat().forEach(i=> {
                console.log('i', i)
                let fileName = uuid.v4() + ".jpg"
                i.mv(path.resolve(__dirname, '..', 'static', fileName))
                Images.create({
                    name: fileName,
                    overviewId: overview.id
                })
            })
        }

        return res.json(overview)
    }

    async createRate(req, res, next) {
        let {rate, overviewId, userId} = req.body
        const candidate = await Rating.findOne({ where: {userId, overviewId} });
        if (candidate) {
            return next(ApiError.badRequest('Вы уже поставили оценку'))
        } 
        const rating = await Rating.create({rate, overviewId, userId})
        return res.json(rating)
    }

    async createComment(req, res, next) {
        let {text, overviewId, userId} = req.body
        console.log(req.body)
        if(!text) {
            return next(ApiError.badRequest('Пустой комментарий'))
        }
        const comment = await Comments.create({text, overviewId, userId})
        return res.json(comment)
    }

    async getAll(req, res) {
        let {typeId, userId, limit, page} = req.query
        page = page || 1
        limit = limit || 6
        let offset = page * limit - limit
        let overviews 
        if (typeId && userId) {
            overviews = await Overview.findAll({where:{typeId, userId}, limit, offset, include: [{model: Images, as:'img'}, {model: Rating, as: 'overalRating'}]})
        }
        if (!typeId && userId) {
            overviews = await Overview.findAll({where:{ userId}, limit, offset, include: [{model: Images, as:'img'}, {model: Rating, as: 'overalRating'}]})
        }
        if (typeId && !userId) {
            overviews = await Overview.findAll({where:{typeId}, limit, offset, include: [{model: Images, as:'img'}, {model: Rating, as: 'overalRating'}]})
        }
        if (!typeId && !userId) {
            overviews = await Overview.findAll({limit, offset, include: [{model: Images, as:'img'}, {model: Rating, as: 'overalRating'}]})
        }         
        return res.json(overviews)
    }

    async getOne(req, res) {
        const {id} = req.params
        const overview = await Overview.findOne({where: {id}, include: [{model: Images, as:'img'}, {model: Rating, as: 'overalRating'}, {model: Comments, as: 'comments'}]})
        return res.json(overview)
    }

    async delete(req, res) {
        const { id } = req.query
        console.log('id:::'. id)
        const overview = await Overview.destroy({where: {id}})
        console.log('overview', overview)
        return res.json('deleted')
    }
}

module.exports = new OverviewController