class Controller {
    static landingPage(req, res) {
        res.render('index');
    }

    static register(req, res) {
        res.render('register');
    }

    static registerPost(req, res) {
        res.send(req.body);
    }

    static login(req, res) {
        res.render('login');
    }

    static loginPost(req, res) {
        res.send(req.body);
    }
}

module.exports = Controller;
