const { Hashtag } = require("../models")

class HashtagController {
    async create(req, res) {
        const {name} = req.body
        const hashtag = await Hashtag.create({name})
        return res.json(hashtag)
    }

    async getAll(req, res) {
        const hashtags = await Hashtag.findAll()
        return res.json(hashtags)
    }


}

module.exports = new HashtagController