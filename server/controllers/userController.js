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
    const {email, password} = req.body
    const user = await User.findOne({where:{email}})
    if (!user) {
      return next(ApiError.internal('Пользователь не найден'))
    }
    let comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) {
      return next(ApiError.internal('Указан неверный пароль'))
    }
    const token = generateJwt(user.id, user.email, user.role, user.name)
    const name = user.name
    const id = user.id
    return res.json({token, name, id})
  }

  async check(req, res) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role, req.user.name)
    return res.json({token})
  }

}

module.exports = new UserController();
