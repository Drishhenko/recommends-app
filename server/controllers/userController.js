const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const ApiError = require('../ApiError')

const generateJwt = (id, email, role, name) => {
    return jwt.sign({id, email, role, name}, process.env.SECRET_KEY, { expiresIn: "24h" })
}

class UserController {
  async registration(req, res, next) {
    const {email, password, role, name} = req.body
    console.log({email, password})
    if (!email || !password) {
      return next(ApiError.badRequest('Некорректный email или password'))
    }
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(ApiError.badRequest('Пользователь с таким email уже существует'))
    }  
    const hashPassword = await bcrypt.hash(password, 2);
    const user = await User.create({ email, password: hashPassword, role, name });
    const token = generateJwt(user.id, user.email, user.role, user.name);
    const id = user.id
    return res.json({token, name, id});
  }

  async login(req, res, next) {
    const {email, password, admin} = req.body
    const user = await User.findOne({where:{email}})
    if (!user) {
      return next(ApiError.internal('Пользователь не найден'))
    }
    if (admin==false) {
      let comparePassword = bcrypt.compareSync(password, user.password)
      if (!comparePassword) {
        return next(ApiError.internal('Указан неверный пароль'))
      }
      return
    }
    
    const token = generateJwt(user.id, user.email, user.role, user.name)
    const name = user.name
    const id = user.id
    const role = user.role
    return res.json({token, name, id, role})
  }

  async check(req, res) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role, req.user.name)
    return res.json({token})
  }

  async getOne(req, res) {
    const {id} = req.params
    const user = await User.findOne({where: {id}})
    const name = user.name
    const userId = user.id
    const createdAt = user.createdAt
    const role = user.role
    const email = user.email

    return res.json({userId, name, createdAt, role, email})
  }

  async getAll(req, res) {
    const users = await User.findAll()
    return res.json(users)
  }
  


}

module.exports = new UserController();
