//atividades

const controller = {};

const mysqlConnection = require('../config/connectMySQL');
const jsonMessages = require("../assets/jsonMessages/bd");
const jsonMessages_login = require("../assets/jsonMessages/login");

const GET_ALL_SQL = 'SELECT * FROM atividades';
const GET_ONE_SQL = 'SELECT * FROM atividades WHERE id_atividade = ?';
const CREATE_ATIVIDADE_SQL = 'INSERT INTO atividades (id_espaco, id_tipo_atividade, nome, valor, num_participantes, confirmada, imagem) values(?, ?, ?, ?, ?, ?, ?)';
const UPDATE_ATIVIDADE_SQL = 'UPDATE atividades SET id_espaco = ?, id_tipo_atividade = ?, nome = ?, valor = ?, num_participantes = ?, confirmada = ?, imagem = ? WHERE id_atividade = ?';
const DELETE_ATIVIDADE_SQL = 'DELETE FROM atividades WHERE id_atividade = ?';

//retorna todas as atividades
controller.listAll = (req, res) => {
    mysqlConnection.query(GET_ALL_SQL, (err, rows, fields) => {
        if (!err) {
            if (rows.length > 0) {
                res.send(rows);
            } else {
                res.status(jsonMessages.db.noRecords.status).send(jsonMessages.db.noRecords);
            }
        } else {
            res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
        }
    })
};

//retorna os dados do id de atividades recebido
controller.listOne = (req, res) => {
    mysqlConnection.query(GET_ONE_SQL, [req.params.id_atividade], (err, rows, fields) => {
        if (!err) {
            if (rows.length > 0) {
                res.send(rows[0]); //sugestao do professor Bruno para devolver so o objeto e nao a lista so com um registo
            } else {
                res.status(jsonMessages.db.noRecords.status).send(jsonMessages.db.noRecords);
            }
        } else {
            res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
        }
    })
};

//cria uma nova atividade com os dados recebidos
controller.save = (req, res) => {
    console.log(req.body);

    //verifica se recebou todos os parametros que estao definidos como not null na base de dados
    if ((!req.body.id_tipo_atividade) || (!req.body.nome)) {
        res.status(jsonMessages.db.requiredData.status).send(jsonMessages.db.requiredData);

    } else {
        //verifica se a atividade ja existe
        /* mysqlConnection.query(GET_ONE_SQL, [req.body.id_atividade], (err, rows, fields) => {
        if (rows.length > 0) {
        res.status(jsonMessages.db.duplicateRecord.status).send(jsonMessages.db.duplicateRecord);

        } else {
        */
       
        //se passou as validacoes vai inserir o registo com os dados recebidos
        mysqlConnection.query(CREATE_ATIVIDADE_SQL, [req.body.id_espaco, req.body.id_tipo_atividade, req.body.nome, req.body.valor, req.body.num_participantes, req.body.confirmada, req.body.imagem], function (err, rows, fields) {
            if (!err) {
                res.status(jsonMessages.db.successInsert.status).send(jsonMessages.db.successInsert);

            } else {
                res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
                console.log(err);
            }
        })
    }
};       


//atualiza os dados do id de atividade recebido
controller.update = (req, res) => {
    console.log(req.params.id);

    //verifica se recebeu todos os parametros que estao definidos como not null na base de dados
    if ((!req.body.id_espaco) || (!req.body.id_tipo_atividade) ||(!req.body.nome)) {
        res.status(jsonMessages.db.requiredData.status).send(jsonMessages.db.requiredData);

    } else {
        //atualiza os dados da atividade recebida
        mysqlConnection.query(UPDATE_ATIVIDADE_SQL, [req.body.id_espaco, req.body.id_tipo_atividade, req.body.nome, req.body.valor, req.body.num_participantes, req.body.confirmada, req.body.imagem, req.params.id], (err, rows, fields) => {
            if (!err) {
                res.status(jsonMessages.db.successUpdate.status).send(jsonMessages.db.successUpdate);

            } else {
                res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
                console.log(err);
            }
        })
    }
};

//elimina a atividade com o id recebido
controller.delete = (req, res) => {
    mysqlConnection.query(DELETE_ATIVIDADE_SQL, [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.status(jsonMessages.db.successDelete.status).send(jsonMessages.db.successDelete);

        } else {
            res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
            //console.log(err);
        }
    })
};


//devolve todos os participantes inscritos numa atividade
controller.list_participantes_atividade = (req, res) => {
    mysqlConnection.query('SELECT utilizadores.id_utilizador, username, nome, morada, cod_postal, localidade, distrito, telefone, email, nacionalidade, perfil, pagou FROM	participantes_atividade, utilizadores WHERE participantes_atividade.id_utilizador = utilizadores.id_utilizador AND participantes_atividade.id_atividade=?', [req.params.id], (err, rows, fields) => {
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


//devolve os dados da inscricao de um participante numa atividade
controller.listone_inscricao = (req, res) => {
    mysqlConnection.query('SELECT utilizadores.id_utilizador, username, nome, morada, cod_postal, localidade, distrito, telefone, email, nacionalidade, perfil, pagou FROM	participantes_atividade, utilizadores WHERE participantes_atividade.id_utilizador = utilizadores.id_utilizador AND participantes_atividade.id_atividade=? AND utilizadores.id_utilizador=?', [req.params.id_atividade, req.params.id_utilizador], (err, rows, fields) => {
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


//inscreve um utilizador numa atividade
controller.register_participant =  (req, res) => {
    //console.log(req.params);
    //console.log(req.body);
    
	//verifica se recebou todos os parametros que estao definidos como not null na base de dados
    if ((req.body.pagou !=0) && (req.body.pagou !=1)) {
        console.log("aqui");
        res.status(jsonMessages.db.requiredData.status).send(jsonMessages.db.requiredData);

    } else {
        //verifica se o registo ja existe
        mysqlConnection.query('SELECT * FROM participantes_atividade WHERE id_atividade=? AND id_utilizador=?', [req.params.id_atividade, req.params.id_utilizador], (err, rows, fields) => {
            if (rows.length > 0) {
                res.status(jsonMessages.db.duplicateRecord.status).send(jsonMessages.db.duplicateRecord);

            } else {
                //se passou as validacoes vai inserir o registo com os dados recebidos
                mysqlConnection.query('INSERT INTO participantes_atividade (id_utilizador, id_atividade, pagou) values(?, ?, ?) ', [req.params.id_utilizador, req.params.id_atividade, req.body.pagou], function (err, rows, fields) {
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


//efetuar o pagamento de uma participante numa atividade
controller.pagar_inscricao = (req, res) => {
    //console.log(req.params);
    //console.log(req.body);
    
	//verifica se recebou todos os parametros que estao definidos como not null na base de dados
    if ((req.body.pagou !=0) && (req.body.pagou !=1)) {
        console.log("aqui");
        res.status(jsonMessages.db.requiredData.status).send(jsonMessages.db.requiredData);

    } else {
        //atualiza os dados do utilizador recebido
        mysqlConnection.query('UPDATE participantes_atividade SET pagou = ? WHERE id_utilizador = ? AND id_atividade = ?', [req.body.pagou, req.params.id_utilizador, req.params.id_atividade], (err, rows, fields) => {
            if (!err){
                res.status(jsonMessages.db.successUpdate.status).send(jsonMessages.db.successUpdate);

            }else{         
                res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
                //console.log(err);
            }
        })
    }
};


//elimina a inscricao de um participante numa atividade
controller.delete_participant = (req, res) => {
    //console.log(req.params);
    
    mysqlConnection.query('DELETE FROM participantes_atividade WHERE id_utilizador = ? AND id_atividade = ?', [req.params.id_utilizador, req.params.id_atividade], (err, rows, fields) => {
        if (!err){
            res.status(jsonMessages.db.successDelete.status).send(jsonMessages.db.successDelete);
            //podemos testar rows.affectedRows == 0 para devolver se ele realmente apagou alguma coisa ou nao

        }else{         
            res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
            //console.log(err);
        }
    })
};


module.exports = controller;