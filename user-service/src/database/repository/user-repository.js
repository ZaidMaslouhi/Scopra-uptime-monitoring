const { UserModel } = require('../models')
const { APIError } = require('../../utils/error-handler/app-errors')

class UserRepository {
  async FindUserByEmail (email) {
    try {
      const user = await UserModel.findOne({ email }).exec()

      return user
    } catch (_) {
      throw new APIError('Unable to find user')
    }
  }

  async FindUserByToken (token) {
    try {
      const user = await UserModel.findOne({ token }).exec()

      return !user ? {} : user.toJSON()
    } catch (_) {
      throw new APIError('Unable to find user by token')
    }
  }

  async CreateNewUser ({ email, password, username, source }) {
    try {
      const newUser = await UserModel.create({
        email,
        password,
        username,
        source
      })

      return newUser.toJSON()
    } catch (_) {
      throw new APIError('Unable to create new user')
    }
  }

  async UpdateUser (user) {
    try {
      const updateUser = {
        email: user.email,
        username: user.username,
        defaultProject: user.defaultProject,
        phoneNumber: user.phoneNumber,
        photoUrl: user.photoUrl
      }

      const updatedUser = await UserModel.findByIdAndUpdate(
        { _id: user.id },
        { $set: updateUser },
        { new: true }
      )

      return updatedUser.toJSON()
    } catch (_) {
      throw new APIError("Unable to update user's informations")
    }
  }

  async UpdateUserToken ({ id, token }) {
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(
        { _id: id },
        { token: token ?? '' }
      )

      return updatedUser.toJSON()
    } catch (_) {
      throw new APIError("Unable to update user's token")
    }
  }
}

module.exports = UserRepository
