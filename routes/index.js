const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()

router.get('/', Controller.landingPage)

router.get('/register', Controller.register)
router.post('/register', Controller.registerPost)

router.get('/login', Controller.login)
router.post('/login', Controller.loginPost)

// router.get('/logout', Controller.logout)


//  untuk global
router.use(function (req, res, next) {  // untuk id
    console.log(req.session);
    if(!req.session.userId){
        const error = `Please login First`
        res.redirect(`/login?error=${error}`)
    }else{
        next()
    }
})


router.use('/home', Controller.home)



router.get('/logout', Controller.getLogout)



const isAdmin = function (req, res, next) { // untuk role
    console.log(req.session);
    if(req.session.userId && req.session.admin){
        const error = `Cant Access`
        res.redirect(`/login?error=${error}`)
    }else{
        next()
    }
}

router.get('/userLists', isAdmin, Controller.register)


//untuk satuan diletakkan setelah path dan cb

// const isLoggedIn = function (req, res, next) {  // untuk id
//     console.log(req.session);
//     if(!req.session.userId){
//         const error = `Please login First`
//         res.redirect(`/login?error=${error}`)
//     }else{
//         next()
//     }
// }

// const isAdmin = function (req, res, next) { // untuk role
//     console.log(req.session);
//     if(req.session.userId && req.session.role !== 'admin'){
//         const error = `Cant Access`
//         res.redirect(`/login?error=${error}`)
//     }else{
//         next()
//     }
// }

// router.get('/', (req, res) => {
//     res.send('Hello World!')
//   })

module.exports = router