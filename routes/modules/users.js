const express = require('express')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const router = express.Router()
const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  // 加入 middleware，驗證 request 登入狀態
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true
}))
  
router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if ( !email || !password || !confirmPassword) {
    errors.push({ message: 'Email、密碼和確認密碼都是必填。'})
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不符合！'})
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }
  User.findOne({ email })
    .then(user => {
      if (user) {
        errors.push({ message: '這個 Email 已經註冊過了。'})
        res.render('register', {
          errors,
          name,
          email,
          password,
          confirmPassword
        })
      } 
      return bcrypt 
        .genSalt(10) // 產生「鹽」，並設定複雜係數為10
        .then(salt => bcrypt.hash(password, salt)) // 為使用者密碼「加鹽」，產生雜湊值
        .then(hash => User.create({
          name,
          email,
          password: hash // 用雜湊值取代原本的使用者密碼
        }))
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
      
    })
    .catch(err => console.log(err))
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出。')
  res.redirect('/users/login')
})

module.exports = router