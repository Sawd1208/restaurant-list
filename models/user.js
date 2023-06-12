const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
  name:{ tyep: String, required: true},
  email: { tyep: String, required: true },
  password: { tyep: String, required: true },
  createAt: { tyep: Date, default: Date.now }
})

module.exports = mongoose.model(User, userSchema)