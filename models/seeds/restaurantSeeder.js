// const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Restaurant = require('../Restaurant')
const User = require('../user')
const db = require('../../config/mongoose')
const restaurantList = require('../../restaurant.json').results
const seedUsers = require('../../SEED_USERS.json').results


db.once('open', () => {
  Promise.all(seedUsers.map((seedUser) => 
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(seedUser.password, salt))
      .then(hash => User.create({
        name: seedUser.name,
        email: seedUser.email,
        password: hash
      }))
      .then(user => {
        const userId = user._id
        const restaurant = seedUser.item.map(index => {
          restaurantList[index].userId = userId
          return restaurantList[index]
        })
        return Restaurant.create(restaurant)
      })
  ))
  .then(() => {
    console.log('done.')
    process.exit()
  })
})




// db.once('open', () => {
//   Promise.all(seedUsers.map((seedUser) =>
//     bcrypt
//       .genSalt(10)
//       .then(salt => bcrypt.hash(seedUser.password, salt))
//       .then(hash => User.create({
//         name: seedUser.name,
//         email: seedUser.email,
//         password: hash
//       }))
//       .then(user => {
//         const userId = user._id
//         const restaurant = seedUser.item.map(index => {
//           restaurantList[index].userId = userId
//           return restaurantList[index]
//         })
//         return Restaurant.create(restaurant)
//       })
//   ))
//     .then(() => {
//       console.log('done')
//       process.exit()
//     })
// })