const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

// 僅在非正式環境時，使用dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Restaurant = require('./models/Restaurant')
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

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))


app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

// 設定瀏覽特定restaurant
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))

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

app.post('/restaurants', (req, res) => {
  return Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})