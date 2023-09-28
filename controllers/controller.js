const { User } = require('../models')

class Controller {
    static landingPage(req, res) {
        res.render('index')
    }

    static register(req, res) {
        let errors = req.query.errors.split(',')
        res.render('register', { errors })
    }

    static registerPost(req, res) {
        const { firstName, lastName, username, password, role } = req.body
        User.create({ firstName, lastName, username, password, role })
            .then(() => {
                res.redirect('/login')
            })
            .catch(err => {
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
