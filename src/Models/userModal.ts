import mongoose, { Schema, model } from 'mongoose'

const schema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  likedBy: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'LikedUsers',
    },
  ],
})

export default model('Users', schema)
