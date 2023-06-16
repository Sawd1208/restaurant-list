const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')

const User = require('../models/user')

module.exports = app => {
  // 初始化 Passport 模組
  app.use(passport.initialize())
  app.use(passport.session())
  
  // 設定本地登入策略
  passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true}, (req, email, password, done) =>{
    User.findOne({ email })
      .then(user => {
        if (!user) {
          // return done(null, false, { message: 'That email is not registered!' })
          return done(null, false, req.flash('warning_msg', 'That email is not registered!'))
        }
        return bcrypt.compare(password, user.password) // 第一個參數是使用者的輸入值，第二個參數是資料庫裡的雜湊值。bcrypt 比對後，會回傳布林值。
          .then(isMatch => {
            if (!isMatch) {
              return done(null, false, req.flash('warning_msg', 'Email or Password incorrect.'))
            }
            return done(null, user)
          })
        // if (user.password !== password) {
        //   // return done(null, false, { message: 'Email or Password incorrect.' })
        //   return done(null, false, req.flash('warning_msg', 'Email or Password incorrect.' ))
        // }
        // return done (null, user)
      })
      .catch(err => done(err, false))
  }))
  
  // 設定序列化與反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err,null))
  })
}