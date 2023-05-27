const mongoose = require('mongoose')

const monitorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    uri: {
      type: String,
      required: true,
      immutable: true
    },
    taskId: {
      type: String,
      required: true,
      immutable: true
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
      immutable: true
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
    },
    timestamps: true
  }
)

module.exports = mongoose.model('Monitor', monitorSchema)
