const { UserModel } = require('../models')

class UserRepository {
  async FindUserByEmail (email) {
    try {
      const user = await UserModel.findOne({ email }).exec()

      return user
    } catch (error) {
      console.log(error)
    }
  }

  async FindUserByToken (token) {
    try {
      const user = await UserModel.findOne({ token }).exec()

      return !user ? {} : user.toJSON()
    } catch (error) {
      console.log(error)
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
    } catch (error) {
      console.log(error)
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
    } catch (error) {
      console.log(error)
    }
  }

  async UpdateUserToken ({ id, token }) {
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(
        { _id: id },
        { token: token ?? '' }
      )

      return updatedUser.toJSON()
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = UserRepository
