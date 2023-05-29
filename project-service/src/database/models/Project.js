const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    monitors: [
      {
        ref: 'Monitor',
        type: mongoose.Schema.Types.ObjectId
      }
    ]
  },
  {
    toJSON: {
      transform (doc, ret) {
        delete ret.__v
      }
    },
    timestamps: true
  }
)

module.exports = mongoose.model('Project', projectSchema)
