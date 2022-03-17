const {Rating} = require ("../models")

class ratingController {
    async create(req, res) {
        const {rate, userId, owerviewId} = req.body
        const rating = await Rating.create({rate, userId, owerviewId})
        return res.json(rating)
    }
}
module.exports = new ratingController