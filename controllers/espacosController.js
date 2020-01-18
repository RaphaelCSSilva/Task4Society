//Espaços

const controller = {};

const mysqlConnection = require('../config/connectMySQL');
const jsonMessages = require("../assets/jsonMessages/bd");
const jsonMessages_login = require("../assets/jsonMessages/login");
// ESPAÇOS
//GET ESPAÇOS
//retorna todos os Espaços
controller.listAllEspacos = (req, res) => {
    mysqlConnection.query('SELECT id_espaco as espacoId , nome, morada, localidade, distrito, cod_postal as codigoPostal, lotacao, id_gestor_espaco as gestorEspacoId, imagem FROM espacos;', (err, rows, fields) => {
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

//PATROCINADORES
//GET PATROCINADOR
//retorna todos os Patrocinadores
controller.listAllPatrocinadores = (req, res) => {
    mysqlConnection.query('SELECT id_patrocinador, nome, logotipo FROM patrocinador;', (err, rows, fields) => {
        if (!err) {
            if (rows.length > 0) {
                res.send(rows);
            }else{
                res.status(jsonMessages.db.noRecords.status).send(jsonMessages.db.noRecords);
            }              
            
        } else {
            Console.error(err);
            res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
        }
        
    })
};


controller.listAllMateriais = (req, res) => {
    mysqlConnection.query('SELECT espacos.nome,materiais.nome,materiais_espaco.qtd_disponivel FROM materiais_espaco INNER JOIN materiais ON materiais.id_material = materiais_espaco.id_material inner join espacos on espacos.id_espaco = materiais_espaco.id_espaco    where espacos.id_espaco = ? ;',[req.params.id], (err, rows, fields) => {
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


controller.listAllPatrocinios = (req, res) => {
    mysqlConnection.query('SELECT id_patrocinio, is_espaco,valor, ativo FROM espacos;', (err, rows, fields) => {
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
//retorna os dados do id de espaço recebido
controller.listOneEspaco = (req, res) => {
    mysqlConnection.query('SELECT id_espaco, nome, morada, localidade, distrito, cod_postal, lotacao, id_gestor_espaco, imagem FROM espacos WHERE id_espaco = ?', [req.params.id], (err, rows, fields) => {
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

//retorna os dados do id de patrocinadors recebido
controller.listOnePatrocinador = (req, res) => {
    mysqlConnection.query('SELECT id_patrocinador, nome, logotipo FROM patrocinador WHERE id_patrocinador = ?', [req.params.id], (err, rows, fields) => {
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

controller.listOnePatrocinio = (req, res) => {
    mysqlConnection.query('SELECT id_espaco, nome, morada, localidade, distrito, cod_postal, lotacao, id_gestor_espaco, imagem FROM espacos WHERE id_espaco = ?', [req.params.id], (err, rows, fields) => {
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

controller.listOneMaterial = (req, res) => {
    mysqlConnection.query('SELECT id_espaco, nome, morada, localidade, distrito, cod_postal, lotacao, id_gestor_espaco, imagem FROM espacos WHERE id_espaco = ?', [req.params.id], (err, rows, fields) => {
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


//POST ESPAÇO
//cria um novo Espaço com os dados recebidos
controller.saveEspacos =  (req, res) => {
    //console.log(req.body);
	//verifica se recebou todos os parametros que estao definidos como not null na base de dados
    if ((!req.body.nome) || (!req.body.localidade) || (!req.body.distrito) || (!req.body.lotacao) || (!req.body.id_gestor_espaco))  {   
        res.status(jsonMessages.db.requiredData.status).send(jsonMessages.db.requiredData);
    } else {
        //verifica se o espaço ja existe
/*         mysqlConnection.query('SELECT * FROM espacos WHERE id_espaco = ?', [req.body.id_espaco], (err, rows, fields) => {
            if (rows.length > 0) {
                res.status(jsonMessages.db.duplicateRecord.status).send(jsonMessages.db.duplicateRecord);
            } else { */
                //se passou as validacoes vai inserir o registo com os dados recebidos
                mysqlConnection.query('INSERT INTO espacos (nome, morada, localidade, distrito, cod_postal, lotacao, id_gestor_espaco, imagem) values(?, ?, ?, ?, ?,?,?,? )',[req.body.nome, req.body.morada, req.body.localidade, req.body.distrito, req.body.cod_postal, req.body.lotacao, req.body.id_gestor_espaco, req.body.imagem], function (err, rows, fields) {
                    if (!err){
                        res.status(jsonMessages.db.successInsert.status).send(jsonMessages.db.successInsert);
                    }else{         
                        res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
                        //console.log(err);
                    }
                })
            }  
        //})        
    };
//};

//POST ESPAÇO
//cria um novo Espaço com os dados recebidos
controller.savePatrocinadores =  (req, res) => {
    //console.log(req.body);
	//verifica se recebou todos os parametros que estao definidos como not null na base de dados
    if ((!req.body.id_espaco) || (!req.body.nome) || (!req.body.localidade) || (!req.body.distrito) || (!req.body.lotacao) || (!req.body.id_gestor_espaco))  {   
        res.status(jsonMessages.db.requiredData.status).send(jsonMessages.db.requiredData);
    } else {
        //verifica se o espaço ja existe
        mysqlConnection.query('SELECT * FROM espacos WHERE id_espaco = ?', [req.body.id_espaco], (err, rows, fields) => {
            if (rows.length > 0) {
                res.status(jsonMessages.db.duplicateRecord.status).send(jsonMessages.db.duplicateRecord);
            } else {
                //se passou as validacoes vai inserir o registo com os dados recebidos
                mysqlConnection.query('INSERT INTO espacos (id_espaco,nome, morada, localidade, distrito, cod_postal, lotacao, id_gestor_espaco, imagem) values(?, ?, ?, ?, ?, ?,?,?,? )',[req.body.id_espaco, req.body.nome, req.body.morada, req.body.localidade, req.body.distrito, req.body.cod_postal, req.body.lotacao, req.body.id_gestor_espaco, req.body.imagem], function (err, rows, fields) {
                    if (!err){
                        res.status(jsonMessages.db.successInsert.status).send(jsonMessages.db.successInsert);
                    }else{         
                        res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
                        //console.log(err);
                    }
                })
            }  
        })        
    }
};


//POST ESPAÇO
//cria um novo Espaço com os dados recebidos
controller.saveMateriais =  (req, res) => {
    //console.log(req.body);
	//verifica se recebou todos os parametros que estao definidos como not null na base de dados
    if ((!req.body.id_espaco) || (!req.body.nome) || (!req.body.localidade) || (!req.body.distrito) || (!req.body.lotacao) || (!req.body.id_gestor_espaco))  {   
        res.status(jsonMessages.db.requiredData.status).send(jsonMessages.db.requiredData);
    } else {
        //verifica se o espaço ja existe
        mysqlConnection.query('SELECT * FROM espacos WHERE id_espaco = ?', [req.body.id_espaco], (err, rows, fields) => {
            if (rows.length > 0) {
                res.status(jsonMessages.db.duplicateRecord.status).send(jsonMessages.db.duplicateRecord);
            } else {
                //se passou as validacoes vai inserir o registo com os dados recebidos
                mysqlConnection.query('INSERT INTO espacos (id_espaco,nome, morada, localidade, distrito, cod_postal, lotacao, id_gestor_espaco, imagem) values(?, ?, ?, ?, ?, ?,?,?,? )',[req.body.id_espaco, req.body.nome, req.body.morada, req.body.localidade, req.body.distrito, req.body.cod_postal, req.body.lotacao, req.body.id_gestor_espaco, req.body.imagem], function (err, rows, fields) {
                    if (!err){
                        res.status(jsonMessages.db.successInsert.status).send(jsonMessages.db.successInsert);
                    }else{         
                        res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
                        //console.log(err);
                    }
                })
            }  
        })        
    }
};




//DELETE ESPAÇO
//elimina o Espaço com o id recebido
controller.deleteEspacos = (req, res) => {
    mysqlConnection.query('DELETE FROM espacos WHERE id_espaco = ?', [req.params.id], (err, rows, fields) => {
        if (!err){
            res.status(jsonMessages.db.successDelete.status).send(jsonMessages.db.successDelete);
            //podemos testar rows.affectedRows == 0 para devolver se ele realmente apagou alguma coisa ou nao

        }else{         
            res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
            //console.log(err);
        }
    })
};

//DELETE ESPAÇO
//elimina o Espaço com o id recebido
controller.deletePatrocinadores = (req, res) => {
    mysqlConnection.query('DELETE FROM espacos WHERE id_espaco = ?', [req.params.id], (err, rows, fields) => {
        if (!err){
            res.status(jsonMessages.db.successDelete.status).send(jsonMessages.db.successDelete);
            //podemos testar rows.affectedRows == 0 para devolver se ele realmente apagou alguma coisa ou nao

        }else{         
            res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
            //console.log(err);
        }
    })
};

//DELETE ESPAÇO
//elimina o Espaço com o id recebido
controller.deleteMateriais = (req, res) => {
    mysqlConnection.query('DELETE FROM espacos WHERE id_espaco = ?', [req.params.id], (err, rows, fields) => {
        if (!err){
            res.status(jsonMessages.db.successDelete.status).send(jsonMessages.db.successDelete);
            //podemos testar rows.affectedRows == 0 para devolver se ele realmente apagou alguma coisa ou nao

        }else{         
            res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
            //console.log(err);
        }
    })
};

//PUT ESPAÇO
//atualiza os dados do id de espaço recebido
controller.updateEspacos = (req, res) => {
    //console.log(req.body);

	//verifica se recebou todos os parametros que estao definidos como not null na base de dados
    if ((!req.body.id_espaco) || (!req.body.nome) || (!req.body.localidade) || (!req.body.distrito) || (!req.body.lotacao) || (!req.body.id_gestor_espaco)) {
        res.status(jsonMessages.db.requiredData.status).send(jsonMessages.db.requiredData);

    } else {
        //atualzia os dados do espaço recebido
        mysqlConnection.query('UPDATE espacos SET nome = ?, morada = ?, localidade = ?, distrito = ?, cod_postal = ?, lotacao = ?, id_gestor_espaco = ?, imagem = ? WHERE id_espaco = ?', [req.body.nome, req.body.morada, req.body.localidade, req.body.distrito, req.body.cod_postal, req.body.lotacao, req.body.id_gestor_espaco, req.body.imagem, req.body.id_espaco], (err, rows, fields) => {
            if (!err){ 
                res.status(jsonMessages.db.successUpdate.status).send(jsonMessages.db.successUpdate);

            }else{         
                res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
                //console.log(err);
            }
        })
    }
};

//PUT ESPAÇO
//atualiza os dados do id de espaço recebido
controller.updatePatrocinadores = (req, res) => {
    //console.log(req.body);

	//verifica se recebou todos os parametros que estao definidos como not null na base de dados
    if ((!req.body.id_espaco) || (!req.body.nome) || (!req.body.localidade) || (!req.body.distrito) || (!req.body.lotacao) || (!req.body.id_gestor_espaco)) {
        res.status(jsonMessages.db.requiredData.status).send(jsonMessages.db.requiredData);

    } else {
        //atualzia os dados do espaço recebido
        mysqlConnection.query('UPDATE espacos SET id_espaco = ?, nome = ?, morada = ?, localidade = ?, distrito = ?, cod_postal = ?, lotacao = ?, id_gestor_espaco = ?, imagem = ? WHERE id_espaco = ?', [req.body.id_espaco, req.body.nome, req.body.morada, req.body.localidade, req.body.distrito, req.body.cod_postal, req.body.lotacao, req.body.id_gestor_espaco, req.body.imagem, req.body.username], (err, rows, fields) => {
            if (!err){ 
                res.status(jsonMessages.db.successUpdate.status).send(jsonMessages.db.successUpdate);

            }else{         
                res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
                //console.log(err);
            }
        })
    }
};


//PUT ESPAÇO
//atualiza os dados do id de espaço recebido
controller.updateMateriais = (req, res) => {
    //console.log(req.body);

	//verifica se recebou todos os parametros que estao definidos como not null na base de dados
    if ((!req.body.id_espaco) || (!req.body.nome) || (!req.body.localidade) || (!req.body.distrito) || (!req.body.lotacao) || (!req.body.id_gestor_espaco)) {
        res.status(jsonMessages.db.requiredData.status).send(jsonMessages.db.requiredData);

    } else {
        //atualzia os dados do espaço recebido
        mysqlConnection.query('UPDATE espacos SET id_espaco = ?, nome = ?, morada = ?, localidade = ?, distrito = ?, cod_postal = ?, lotacao = ?, id_gestor_espaco = ?, imagem = ? WHERE id_espaco = ?', [req.body.id_espaco, req.body.nome, req.body.morada, req.body.localidade, req.body.distrito, req.body.cod_postal, req.body.lotacao, req.body.id_gestor_espaco, req.body.imagem, req.body.username], (err, rows, fields) => {
            if (!err){ 
                res.status(jsonMessages.db.successUpdate.status).send(jsonMessages.db.successUpdate);

            }else{         
                res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
                //console.log(err);
            }
        })
    }
};





//faz a autenticacao do utilizador recebido
controller.auth = (req, res) => {
    //console.log(req.body);

	//verifica se recebou todos os parametros necessarios
    if ((!req.body.username) || (!req.body.password)) {
        res.status(jsonMessages.db.requiredData.status).send(jsonMessages.db.requiredData);

    } else {
        mysqlConnection.query('SELECT * FROM utilizadores WHERE username = ?', [req.body.username], (err, rows, fields) => {
            if (!err) {
                if (rows.length > 0) {
                    if (rows[0].password === req.body.password) {
                        //res.status(jsonMessages_login.user.signinSucces.status).send(jsonMessages_login.user.signinSucces);
                        res.status(jsonMessages_login.user.signinSucces.status).json({response: jsonMessages_login.user.signinSucces, perfis: []}); //forma alternativa para enviar as repostas combinando dois ou mais objetos
                        
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


module.exports = controller;