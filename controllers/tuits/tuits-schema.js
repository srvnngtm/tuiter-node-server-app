import mongoose from 'mongoose';
const schema = mongoose.Schema({
  tuit: String,
  username: String,
  handle: String,
  image: String,
  topic: String,
  time: String,
  likes: Number,
  liked: Boolean,
  replies: Number,
  retuits: Number, 
  dislikes: Number,
  disliked: Boolean


}, {collection: 'tuits'});
export default schema;

