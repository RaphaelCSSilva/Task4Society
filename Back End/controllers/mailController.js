const controller = {};
 
//const mysqlConnection = require('../config/connectMySQL');
const jsonMessages = require("../assets/jsonMessages/mail");
//const jsonMessages_login = require("../assets/jsonMessages/login");
 
 
 
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
 
function sendMail(req, res) {
  console.log(req.body);
 
  //const nome = req.body.nome;
  //const nome = req.sanitize('nome').escape();
 
  const email = req.sanitize('email').escape();
  //const email = req.body.email;
  //const assunto = req.body.assunto;
 
  //const assunto = req.sanitize('assunto').escape();
  //req.checkBody("nome", "Insira apenas o texto", 'pt-PT').matches(/^[a-z ]+$/i);
  req.checkBody("email", "Insira um email válido.").isEmail();
  //console.log(email);
 
 const errors = req.getValidationResult();
 console.log(errors);
 
 if (!errors) {
  res.send(errors);
  return;
 }
 else {
 
 
  if (typeof(email) != "undefined") {
   let bodycontent = "";
   //bodycontent += 'Caro ' + nome + ',<br>' + '<br>';
   bodycontent += 'Esperemos que goste das nossas atividades!' + '<br>' + 'Obrigado!' + '<br>' + '<br>';
   /* bodycontent += 'Mensagem enviada: <blockquote><i>';
   bodycontent += assunto + '<br>' + '<br>' + 'mensagem enviada por Task4Society';
   bodycontent += ' com o email <a href="mailto:ptasksociety@gmail.com' + '" target="_top">' + 'ptasksociety@gmail.com' + '</a>';
   bodycontent += '</i></blockquote>'; */
    
   const transporter = nodemailer.createTransport(smtpTransport({
    service: 'Gmail',
    auth: {
     user: 'ptasksociety@gmail.com',
     pass: "ldqgczabknmklqhl"
    }
   }));
   transporter.verify(function(error, success) {
    if (error) {
     console.log(error);
     res.status(jsonMessages.mail.serverError.status).send(jsonMessages.mail.serverError);
    }
    else {
     console.log('Server is ready to take our messages');
    }
   });
   const mailOptions = {
    from: 'ptasksociety@gmail.com',
    to: req.body.email,
    cc: req.body.email,
    subject: 'Task4Society - site contact',
    html: bodycontent
   };
   transporter.sendMail(mailOptions, function(error, info) {
    console.log('estou aqui');
    if (error) {
     console.log(error);
     res.status(jsonMessages.mail.mailError.status).send(jsonMessages.mail.mailError);
    }
    else {
     console.log('Email sent: ' + info.response);
     res.status(jsonMessages.mail.mailSent.status).send(jsonMessages.mail.mailSent);
    }
   });
  }
  else
   res.status(jsonMessages.mail.requiredData.status).send(jsonMessages.mail.requiredData);
 };
 
};
 
module.exports = {
 send: sendMail
};