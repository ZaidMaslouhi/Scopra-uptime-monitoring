const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'email required'],
      unique: [true, 'email already registered']
    },
    username: {
      type: String,
      required: true
    },
    password: {
      type: String
    },
    photoUrl: {
      type: String,
      default: ''
    },
    phoneNumber: {
      type: String,
      default: ''
    },
    source: {
      type: String,
      required: [true, 'source not specified']
    },
    token: {
      type: String,
      default: ''
    },
    defaultProject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project'
    }
  },
  {
    toJSON: {
      transform (doc, ret) {
        delete ret.password
        delete ret.__v
      }
    },
    timestamps: true
  }
)

module.exports = mongoose.model('User', userSchema)
