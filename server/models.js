const sequelize = require('./db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'USER'}
});

const Overview = sequelize.define('overview', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    text: {type: DataTypes.STRING},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    // hashtags: {type: DataTypes.ARRAY(DataTypes.INTEGER)},
})

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const Images = sequelize.define('images', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false}
})
const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull: false}
})
// const Hashtag = sequelize.define('hash-tag', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     name: {type: DataTypes.STRING, unique: true, allowNull: false}
// })


// const OverviewTag = sequelize.define('overview-tag', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
// })

User.hasMany(Overview)
Overview.belongsTo(User)

Type.hasMany(Overview)
Overview.belongsTo(Type)

Overview.hasMany(Images, {as: 'img'})
Images.belongsTo(Overview)

User.hasMany(Rating)
Rating.belongsTo(User)

Overview.hasMany(Rating, {as: 'overalRating'})
Rating.belongsTo(Overview)


// Overview.belongsToMany(Hashtag, {through: OverviewTag})
// Hashtag.belongsToMany(Overview, {through: OverviewTag})


module.exports = {
    User,
    Overview,
    Type,
    Images,
    Rating,
    // Hashtag
}
