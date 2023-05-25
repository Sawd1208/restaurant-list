const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/Restaurant')

router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

// 搜尋餐廳
router.get('/search', (req, res) => {
  const keywords = req.query.keyword
  const keyword = keywords.toLowerCase().trim()
  const sort = req.query.sort
  Restaurant.find()
    .lean()
    .sort(`${sort}`)
    .then(restaurants => {
      const filterRestaurants = restaurants.filter(data => {
        return data.name.toLowerCase().includes(keyword) || data.category.toLowerCase().includes(keyword)
      })

      if (filterRestaurants.length === 0) {
        res.render('error', { keyword })
      } else { res.render('index', { restaurants: filterRestaurants, keyword, sort }) 
      }
    })
    .catch(error => console.log(error))
})


module.exports = router