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
        res.redirect(`/login?errors=${error}`)
    }else{
        next()
    }
})


router.get('/logout', Controller.getLogout)

router.use('/home', Controller.home)

router.get('/deposit', Controller.deposit)
router.post('/deposit', Controller.depositPost)

router.get('/withdraw', Controller.withdraw)
router.post('/withdraw', Controller.withdrawPost)

router.get('/transfer', Controller.transfer)
// router.post('/transfer', Controller.transferPost)

router.get('/sharesLists', Controller.sharesLists)
router.post('/buyShares', Controller.buyShares)

const isAdmin = function (req, res, next) { // untuk role
    console.log(req.session);
    if(req.session.userId && req.session.admin){
        next()
    }else{
        const error = `Cant Access`
        res.redirect(`/login?error=${error}`)
    }
}

router.get('/userLists', isAdmin, Controller.userLists)
router.get('/userLists/delete/:id', isAdmin, Controller.userListsDelete)


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