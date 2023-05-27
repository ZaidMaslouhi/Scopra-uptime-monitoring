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
const {
  NotFoundError,
  UnauthorizedError,
  BadRequestError,
  ConflictError,
  APIError
} = require('../utils/error-handler/app-errors')

class UserService {
  constructor () {
    this.repository = new UserRepository()
  }

  async loginUser ({ user }) {
    if (!user || !user.email || !user.password) { throw new BadRequestError('User email and password are required!') }

    const loggedUser = await this.repository.FindUserByEmail(user.email)
    if (!loggedUser) throw new NotFoundError('Cannot found the user!')

    const match = await ValidatePassword(user.password, loggedUser.password)
    if (!match) throw new UnauthorizedError('Invalid password!')

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
    if (!updatedUser) throw new NotFoundError('Cannot update user token!')

    return FormateData({
      user: { ...updatedUser, token: accessToken },
      refreshToken
    })
  }

  async createUser (user) {
    if (!user || !user.email || !user.password) { throw new BadRequestError('User Email and Password are required!') }

    const userExisted = await this.repository.FindUserByEmail(user.email)
    if (userExisted) throw new ConflictError('User already exists!')

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
    if (!updatedUser) throw new APIError('Cannot update user token!')

    return FormateData({
      newUser: { ...updatedUser, token: accessToken },
      refreshToken
    })
  }

  async updateUser (user) {
    if (!user || !user.id) throw new BadRequestError('User ID is required!')

    const updatedUser = await this.repository.UpdateUser(user)
    if (!updatedUser) throw new NotFoundError('User does not exists!')

    return FormateData(updatedUser)
  }

  async updateUserToken ({ id, token }) {
    if (!id) throw new BadRequestError('User ID is required!')

    const updatedUser = this.repository.UpdateUserToken({ id, token })
    if (!updatedUser) throw new NotFoundError('User does not exists!')

    return FormateData(updatedUser)
  }

  async findUserByToken (token) {
    if (!token) throw new BadRequestError('Token is required!')

    const user = await this.repository.FindUserByToken(token)

    return user
  }
}

module.exports = UserService
