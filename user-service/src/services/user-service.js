const { UserRepository } = require('../database/repository')
const {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY
} = require('../config')
const {
  GeneratePassword,
  ValidatePassword,
  GenerateToken,
  FormateData
} = require('../utils')

class UserService {
  constructor () {
    this.repository = new UserRepository()
  }

  async loginUser ({ user }) {
    const loggedUser = await this.repository.FindUserByEmail(user.email)

    const match = await ValidatePassword(user.password, loggedUser.password)
    if (!match) throw new Error('Invalid password!')

    const accessToken = GenerateToken(
      { user: loggedUser._id },
      ACCESS_TOKEN_KEY,
      '30min'
    )
    const refreshToken = GenerateToken(
      { user: loggedUser._id },
      REFRESH_TOKEN_KEY,
      '1d'
    )

    const updatedUser = await this.repository.UpdateUserToken({
      id: loggedUser._id,
      token: refreshToken
    })

    return FormateData({
      user: { ...updatedUser, token: accessToken },
      refreshToken
    })
  }

  async createUser (user) {
    const userExisted = await this.repository.FindUserByEmail(user.email)
    if (userExisted) throw new Error('User already exists!')

    const username =
      user.username ?? user.email.slice(0, user.email.indexOf('@'))
    const password = await GeneratePassword(user.password, 10)

    const newUser = await this.repository.CreateNewUser({
      email: user.email,
      password,
      username,
      source: 'Scopra'
    })

    const accessToken = GenerateToken(
      { user: newUser._id },
      ACCESS_TOKEN_KEY,
      '30min'
    )
    const refreshToken = GenerateToken(
      { user: newUser._id },
      REFRESH_TOKEN_KEY,
      '1d'
    )

    const updatedUser = await this.repository.UpdateUserToken({
      id: newUser._id,
      token: refreshToken
    })

    return FormateData({
      newUser: { ...updatedUser, token: accessToken },
      refreshToken
    })
  }

  async updateUser (user) {
    const updatedUser = await this.repository.UpdateUser(user)

    return FormateData(updatedUser)
  }

  async updateUserToken ({ id, token }) {
    const updatedUser = this.repository.UpdateUserToken({ id, token })

    return FormateData(updatedUser)
  }

  async findUserByToken (token) {
    const user = await this.repository.FindUserByToken(token)

    return user
  }
}

module.exports = UserService
