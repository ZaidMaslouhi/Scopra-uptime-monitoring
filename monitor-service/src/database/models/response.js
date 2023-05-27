const mongoose = require('mongoose')

const responseSchema = new mongoose.Schema(
  {
    taskId: {
      type: String,
      required: true
    },
    responseStatus: {
      type: String,
      required: true
    },
    responseDuration: {
      type: Number,
      required: true
    },
    sslExpirationDate: {
      type: String,
      default: '-'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    toJSON: {
      transform (doc, ret) {
        delete ret.__v
      }
    }
  }
)

module.exports = mongoose.model('Response', responseSchema)
