const { User, Detail, Type, Shares, UserShares } = require('../models')
const bcrypt = require('bcryptjs')
const CC = require('currency-converter-lt')
const { formatCurrencyIDR, formatCurrencyUSD, formatCurrencyGBP, decideType } = require('../helper/helper')

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
        let errors
        if (req.query.errors) {
            errors = req.query.errors.split(',')
        }
        res.render('login', { errors })
    }

    static loginPost(req, res) {
        User.findOne({ where: { username: req.body.username } })
            .then((data) => {
                if (data) {
                    if (bcrypt.compareSync(req.body.password, data.password)) {
                        req.session.userId = data.id
                        req.session.admin = data.isAdmin // true/false
                        return res.redirect('/home')
                    } else {
                        return res.redirect('/login?errors=Invalid username/password')
                    }
                } else {
                    return res.redirect('/login?errors=Username is not found. Please register first')
                }
            })
            .catch(err => {
                res.send(err)
            })
    }

    static getLogout(req, res){
        req.session.destroy((err) => {
            if(err) res.send(err)
            else{
                res.redirect('/login')
            }
        })
    }

    static home(req, res) {
        let userData, balanceUSD, balanceGBP, balance
        User.findOne({
            where : {id : req.session.userId},
            include: [Detail, Type]
        })
            .then(data => {
                balance = data.Detail.balance
                data.Detail.balance = formatCurrencyIDR(data.Detail.balance)
                userData = data
                return new CC({from:"IDR", to:"USD", amount:balance}).convert()
            })
            .then(data => {
                balanceUSD = formatCurrencyUSD(data)
                return new CC({from:"IDR", to:"GBP", amount:balance}).convert()
            })
            .then(data => {
                console.log(data, 'GBP');
                balanceGBP = formatCurrencyGBP(data)
                res.render('home', { userData, balanceUSD, balanceGBP })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static deposit(req, res) {
        res.render('deposit')
    }

    static depositPost(req, res) {
        Detail.increment('balance', { by: req.body.amount, where: { UserId: req.session.userId } })
            .then(() => {
                return User.findOne({ where: { id: req.session.userId }, include: [Detail] })
            })
            .then(data => {
                // update type if youre rich
                let type = decideType(data.Detail.balance, data.TypeId)
                return User.update({ TypeId: type }, { where: { id: req.session.userId } })
            })
            .then(() => {
                res.redirect('/home')
            })
            .catch(err => {
                res.send(err)
            })
    }

    static withdraw(req, res) {
        res.render('withdraw')
    }

    static withdrawPost(req, res) {
        Detail.decrement('balance', { by: req.body.amount, where: { UserId: req.session.userId } })
            .then(() => {
                res.redirect('/home')
            })
            .catch(err => {
                res.send(err)
            })
    }

    static userLists(req, res) {
        User.findAll({
            include: [Detail, Type]
        })
            .then(data => {
                data.forEach(el => {
                    el.Detail.balance = formatCurrencyIDR(el.Detail.balance)
                })
                // res.send(data)
                res.render('userLists', { data })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static userListsDelete(req, res) {
        User.destroy({ where: { id: req.params.id } })
            .then(() => {
                res.redirect('/userLists')
            })
            .catch(err => {
                res.send(err)
            })
    }

    static sharesLists(req, res) {
        let sharesData
        Shares.findAll({order : [['id', 'ASC']]})
            .then(data => {
                data.forEach(el => {
                    el.price = formatCurrencyIDR(el.price)
                })
                sharesData = data
                // res.send(data)
                // res.render('sharesLists', {data})
                return User.findOne({ where: { id: req.session.userId }, include: [Detail] })
            })
            .then(data => {
                data.Detail.balance = formatCurrencyIDR(data.Detail.balance)
                res.render('sharesLists', {data, sharesData})
            })
            .catch(err => {
                res.send(err)
            })
    }

    static buyShares (req, res) {
        let sharesData, userData
        Shares.findOne({where : {id : req.body.companyId}})
        .then(data => {
            sharesData = data
            return User.findOne({where : {id : req.session.userId}, include : [Detail]})
        })
        .then(data => {
            userData = data
            if(data.Detail.balance < sharesData.price * req.body.stockAmount){
                throw new Error('Not enough balance')
            }else{
                return Detail.decrement('balance', {by : sharesData.price * req.body.stockAmount, where : {UserId : req.session.userId}})
            }
        })
        .then(data => {
            return Shares.decrement('remainingShares', {by : req.body.stockAmount, where : {id : req.body.companyId}})
        })
        .then(data => {
            let totalPrice = sharesData.price * req.body.stockAmount
            return UserShares.create({
            })
        })
        .then(data => {
            res.redirect('/home')
        })
        .catch(err => {
            console.log(err);
            res.send(err)
        })
    }
}

module.exports = Controller
