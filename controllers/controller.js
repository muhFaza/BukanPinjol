const { User, Detail } = require('../models')

class Controller {
    static landingPage(req, res) {
        res.render('index')
    }

    static register(req, res) {
        
        let errors
        if (req.query.errors) {
            errors = req.query.errors.split(',')
        }
        res.render('register', { errors })
    }

    static registerPost(req, res) {
        let userId
        User.create({ ...req.body } , {returning: true})
            .then((data) => {
                userId = data.id
                return User.findOne({
                    where: {
                        username: req.body.username
                    }
                })
            })
            .then((data) => {
                req.body.fullName = `${req.body.firstName} ${req.body.lastName}`
                req.body.UserId = userId
                return Detail.create({ ...req.body })
            })
            .then(() => {
                res.redirect('/login')
            })
            .catch(err => {
                console.log('masuk err');
                if (err.name == 'SequelizeValidationError') {
                    let errors = err.errors.map(el => el.message)
                    res.redirect(`/register?errors=${errors}`)
                } else {
                    res.send(err)
                }
            })
    }

    static login(req, res) {
        res.render('login')
    }

    static loginPost(req, res) {
        res.send(req.body)
    }
}

module.exports = Controller
