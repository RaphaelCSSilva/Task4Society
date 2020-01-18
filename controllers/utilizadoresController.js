//utilizadores

const controller = {};

const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

const mysqlConnection = require('../config/connectMySQL');
const jsonMessages = require("../assets/jsonMessages/bd");
const jsonMessages_login = require("../assets/jsonMessages/login");


//retorna todos os utilizadores
controller.listAll = (req, res) => {
    mysqlConnection.query('SELECT id_utilizador, username, nome, morada, cod_postal, localidade, distrito, telefone, email, nacionalidade, perfil FROM utilizadores', (err, rows, fields) => {
        if (!err) {
            if (rows.length > 0) {
                res.send(rows);
            }else{
                res.status(jsonMessages.db.noRecords.status).send(jsonMessages.db.noRecords);
            }              
        } else {
            res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
        }
    })
};


//retorna os dados do id de utilizador recebido
controller.listOne = (req, res) => {
    mysqlConnection.query('SELECT id_utilizador, username, nome, morada, cod_postal, localidade, distrito, telefone, email, nacionalidade, perfil FROM utilizadores WHERE id_utilizador = ?', [req.params.id_utilizador], (err, rows, fields) => {
        if (!err) {
            if (rows.length > 0) {
                res.send(rows[0]);//sugestao do professor Burno para devolver so o objeto e nao a lista so com um registo
            }else{
                res.status(jsonMessages.db.noRecords.status).send(jsonMessages.db.noRecords);
            }              
        } else {
            res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
        }
    })
};


//cria um novo utilizador com os dados recebidos
controller.save =  (req, res) => {
    req.check('username', 'O nome de utilizador deve ter no mínimo 5 caractéres.').isLength({ min: 5 });
    req.check('password').isLength({ min: 5 }).withMessage('A password deve ter no mínimo 5 caractéres.'); 
    req.check('nome').isLength({ min: 1 }).withMessage('O nome do utilizador é um campo obrigatório.');
    req.check('perfil').isLength({ min: 1 }).withMessage('O perfil do utilizador é um campo obrigatório.');
    req.check('perfil').isIn(['base', 'gestor', 'administrador']).withMessage('O utilizador pode pertencer a um dos perfis: (base, gestor, administrador).');
    //console.log(req.body);
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }    
    
	//verifica se recebou todos os parametros que estao definidos como not null na base de dados
    if ((!req.body.username) || (!req.body.password) || (!req.body.nome) || (!req.body.perfil)) {
        res.status(jsonMessages.db.requiredData.status).send(jsonMessages.db.requiredData);

    } else {
        //verifica se o utilizador ja existe
        mysqlConnection.query('SELECT * FROM utilizadores WHERE username = ?', [req.body.username], (err, rows, fields) => {
            if (rows.length > 0) {
                res.status(jsonMessages.db.duplicateRecord.status).send(jsonMessages.db.duplicateRecord);

            } else {
                let hash = bcrypt.hashSync(req.body.password, 10);

                //se passou as validacoes vai inserir o registo com os dados recebidos
                mysqlConnection.query('INSERT INTO utilizadores (username, password, nome, morada, cod_postal, localidade, distrito, telefone, email, nacionalidade, perfil) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ', [req.body.username, hash, req.body.nome, req.body.morada, req.body.cod_postal, req.body.localidade, req.body.distrito, req.body.telefone, req.body.email, req.body.nacionalidade, req.body.perfil], function (err, rows, fields) {
                    if (!err){
                        res.status(jsonMessages.db.successInsert.status).send(jsonMessages.db.successInsert);

                    } else {     
                        res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
                        //console.log(err);
                    }
                })
            }  
        })        
    }
};


//atualiza os dados do id de utilizador recebido
controller.update = (req, res) => {
    req.check('username').isLength({ min: 5 }).withMessage('O nome de utilizador deve ter no mínimo 5 caractéres.'),
    req.check('password').isLength({ min: 5 }).withMessage('A password deve ter no mínimo 5 caractéres.'), 
    req.check('nome').isLength({ min: 1 }).withMessage('O nome do utilizador é um campo obrigatório.');
    //console.log(req.body);
        
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }    

	//verifica se recebou todos os parametros que estao definidos como not null na base de dados
    if ((!req.body.username) || (!req.body.password) || (!req.body.nome)) {
        res.status(jsonMessages.db.requiredData.status).send(jsonMessages.db.requiredData);

    } else {
        let hash = bcrypt.hashSync(req.body.password, 10);        
        
        //atualiza os dados do utilizador recebido
        mysqlConnection.query('UPDATE utilizadores SET password = ?, nome = ?, morada = ?, cod_postal = ?, localidade = ?, distrito = ?, telefone = ?, email = ?, nacionalidade = ? WHERE id_utilizador = ?', [hash, req.body.nome, req.body.morada, req.body.cod_postal, req.body.localidade, req.body.distrito, req.body.telefone, req.body.email, req.body.nacionalidade, req.params.id], (err, rows, fields) => {
            if (!err){
                res.status(jsonMessages.db.successUpdate.status).send(jsonMessages.db.successUpdate);

            }else{         
                res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
                //console.log(err);
            }
        })
    }
};


//elimina o utilizador com o id recebido
controller.delete = (req, res) => {
    mysqlConnection.query('DELETE FROM utilizadores WHERE id_utilizador = ?', [req.params.id_utilizador], (err, rows, fields) => {
        if (!err){
            res.status(jsonMessages.db.successDelete.status).send(jsonMessages.db.successDelete);
            //podemos testar rows.affectedRows == 0 para devolver se ele realmente apagou alguma coisa ou nao

        }else{         
            res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
            //console.log(err);
        }
    })
};


//faz a autenticacao do utilizador recebido
controller.auth = (req, res) => {
    req.check('username').isLength({ min: 5 }).withMessage('O nome de utilizador deve ter no mínimo 5 caractéres.');
    req.check('password').isLength({ min: 5 }).withMessage('A password deve ter no mínimo 5 caractéres.');
    //console.log(req.body);

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }    

	//verifica se recebou todos os parametros necessarios
    if ((!req.body.username) || (!req.body.password)) {
        res.status(jsonMessages.db.requiredData.status).send(jsonMessages.db.requiredData);

    } else {
        mysqlConnection.query('SELECT * FROM utilizadores WHERE username = ?', [req.body.username], (err, rows, fields) => {
            if (!err) {
                if (rows.length > 0) {
                    //res.status(jsonMessages_login.user.signinSucces.status).send(jsonMessages_login.user.signinSucces);
                    
                    let hash = bcrypt.hashSync(req.body.password, 10);

                    if (bcrypt.compareSync(req.body.password, rows[0].password)) {
                        rows[0].password = "nao envia a password por questoes de seguranca";

                        //res.status(jsonMessages_login.user.signinSucces.status).send(jsonMessages_login.user.signinSucces);
                        res.status(jsonMessages_login.user.signinSucces.status).json({response: jsonMessages_login.user.signinSucces, utilizador: rows[0]}); //forma alternativa para enviar as repostas combinando dois ou mais objetos

                    } else {
                        res.status(jsonMessages_login.user.error.status).send(jsonMessages_login.user.error);

                    }

                } else {
                    res.status(jsonMessages.db.noRecords.status).send(jsonMessages.db.noRecords);
                }
            } else {
                res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
                //res.status(jsonMessages.db.dbError.status).json({key_name1: json_object1, key_name2: json_object2}); //forma alternativa para enviar as repostas combinando dois ou mais objetos
            }
        })    
    }
};


//devolve todos os espacos visitados por um utilizador
controller.visited_spaces = (req, res) => {
    mysqlConnection.query('SELECT espacos.* FROM atividades, espacos, participantes_atividade WHERE	atividades.id_atividade=participantes_atividade.id_atividade AND atividades.id_espaco=espacos.id_espaco	AND participantes_atividade.id_utilizador= ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            if (rows.length > 0) {
                res.send(rows);
            }else{
                res.status(jsonMessages.db.noRecords.status).send(jsonMessages.db.noRecords);
            }              
        } else {
            res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
        }
    })
};


//devolve todass as atividades realizadas por um utilizador
controller.realized_ativities = (req, res) => {
    mysqlConnection.query('SELECT atividades.*, tipos_atividades.* FROM	atividades,	tipos_atividades, participantes_atividade WHERE	atividades.id_atividade=participantes_atividade.id_atividade AND atividades.id_tipo_atividade=tipos_atividades.id_tipo_atividade AND participantes_atividade.id_utilizador= ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            if (rows.length > 0) {
                res.send(rows);
            }else{
                res.status(jsonMessages.db.noRecords.status).send(jsonMessages.db.noRecords);
            }              
        } else {
            res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
        }
    })
};


module.exports = controller;