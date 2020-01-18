const db = require("../models");
const jsonMessages = require("../assets/jsonMessages/login.js")
var controller = {};

controller.signin = function(req, res, next) {
    res.status(jsonMessages.user.signinSucces.status).send({ message: jsonMessages.user.signinSucces, id_utilizador: req.user.id_utilizador});
};

controller.signup = function(req, res, next) {
    console.log(req.body);
    console.log('teste');
    const email = req.sanitize('email').escape();
    const password = req.sanitize('password').escape();
    const nome = req.sanitize('nome').escape();
    const username = req.sanitize('username').escape();

    req.check('email', "Email inválido!").isEmail();
    req.check('password', "A palavra-passe tem de conter no mínimo um número e uma letra!").isAlphanumeric();
    req.check('password', "A palavra-passe tem de conter no mínimo 6 caracteres!").isLength({ min: 6 });
    req.check('nome', "O nome só pode conter letras!").isAlpha();
    req.check('nome', 'O nome tem de ter no mínimo 2 letras!').isLength({ min: 2 });
    req.check('username', 'O username tem de ter no mínimo 2 letras!').isLength({ min: 2 });
    const result = req.validationErrors();
    console.log(result);
    if (result) {
        // Response will contain something like
        // { errors: [ "body[password]: must be at least 10 chars long" ] }
        console.log('teste');
        return res.json({ errors: result.array() });

  }

    user = {
      email: email,
      password: password,
      nome: nome,
      username: username,
      perfil: 'Utilizador'
    };

    db.User.create(user).then(function () {
        res.status(jsonMessages.user.signupSuccess.status).send(jsonMessages.user.signupSuccess);
      }).catch(function (err) {
        console.log(err);
        console.log(user);
        res.json(err);
      })/* .then(req.login((user), (req, res, err) => {
        if (!err) {
          console.log('LoginSuccess');
        } else {
          console.log(err);
        }
      })); */

    
};


controller.logout = function(req, res, err) {
    req.logout();
    req.session = null;
    res.status(jsonMessages.user.logoutSuccess.status).send(jsonMessages.user.logoutSuccess);
};

controller.googleCallback = function(req, res, next) {
    req.session.token = req.user.token;
    res.redirect('/index-google');
    console.log(req.session.token);
};

module.exports = controller;