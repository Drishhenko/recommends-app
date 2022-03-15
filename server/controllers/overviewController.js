const uuid = require('uuid')
const path = require('path')
const { Overview, Images } = require("../models")



class OverviewController {
    async create(req, res) {
        let {name, text, typeId, userId, rating} = req.body
        let img = req.files      
        const overview = await Overview.create({name, text, rating, typeId, userId})
        console.log('img',img)
        if(img) {
            img.forEach(i => {
                let fileName = uuid.v4() + ".jpg"
                img.mv(path.resolve(__dirname, '..', 'static', fileName))
                Images.create({
                    name: i.fileName,
                    overviewId: overview.id
                })
            })
        }

        return res.json(overview)
    }

    async getAll(req, res) {
        let {typeId, userId, limit, page} = req.query
        page = page || 1
        limit = limit || 6
        let offset = page * limit - limit
        let overviews 
        if (typeId && userId) {
            overviews = await Overview.findAll({where:{typeId, userId}, limit, offset})
        }
        if (!typeId && userId) {
            overviews = await Overview.findAll({where:{ userId}, limit, offset})
        }
        if (typeId && !userId) {
            overviews = await Overview.findAll({where:{typeId}, limit, offset})
        }
        if (!typeId && !userId) {
            overviews = await Overview.findAll({limit, offset})
        }         
        return res.json(overviews)
    }

    async getOne(req, res) {
        const {id} = req.params
        const overview = await Overview.findOne({where: {id}})
        return res.json(overview)
    }

    async delete(req, res) {
        const { id } = req.body
        console.log('ID :::', id);
        const type = await Overview .destroy({where: {id}})
        return res.json('deleted')
    }

}

module.exports = new OverviewController