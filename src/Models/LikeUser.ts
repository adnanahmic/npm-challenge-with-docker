import mongoose, { Schema, model } from 'mongoose'

const schema = new Schema({
  liked: {
    type: mongoose.Types.ObjectId,
  },
  likedBy: {
    type: mongoose.Types.ObjectId,
  },
})

export default model('LikedUsers', schema)
