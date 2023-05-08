const express = require('express')
const mongoose = require('mongoose')

// 僅在非正式環境時，使用dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
const port = 3000
mongoose.connect(process.env.MONGODB_URI) // 設定連線到 mongoDB

const db = mongoose.connection

db.on('error', () => {
  console.log('mongoose error!')
})

db.once('open', () => {
  console.log('mongoose connected!')
})

// require handlebars in the project
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
  res.render('index', ({ restaurants: restaurantList.results }))
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', ({ restaurant: restaurant }))
})

app.get('/search', (req, res) => {
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(req.query.keyword.toLowerCase().trim()) || restaurant.category.toLowerCase().includes(req.query.keyword.toLowerCase().trim())
  })
  
  if (restaurants.length === 0) {
    res.render('error')
  } else { 
    res.render('index', ({ restaurants: restaurants, keyword: req.query.keyword })) 
  }
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})