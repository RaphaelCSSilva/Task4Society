//Tipos de Atividade

const controller = {};

const mysqlConnection = require('../config/connectMySQL');
const jsonMessages = require('../assets/jsonMessages/bd');

const GET_ALL_SQL = 'SELECT * FROM tipos_atividades';
const GET_ONE_SQL = 'SELECT * FROM tipos_atividades WHERE id_tipo_atividade = ?';
const CREATE_TIPO_ATIVIDADE_SQL = 'INSERT INTO tipos_atividades (nome) values(?)';
const UPDATE_RESERVATION_SQL = 'UPDATE tipos_atividade SET dataHora = ? WHERE id_espaco = ? AND id_atividade = ?';
const DELETE_RESERVATION_SQL = 'DELETE FROM tipos_atividade WHERE id_espaco = ? AND id_atividade = ?';

//retorna todas as tipos_atividade
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

//Retorna a reserva dos dados ids recebidos
controller.listOne = (req, res) => {
    mysqlConnection.query(GET_ONE_SQL, 
    [
        req.params.id_tipo_atividade
    ], 
    (err, rows, fields) => {
        if (!err) {
            if (rows.length > 0) {
                res.send(rows[0]);
            } else {
                res.status(jsonMessages.db.noRecords.status).send(jsonMessages.db.noRecords);
            }
        } else {
            res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
        }
    } )
};

//Inserir uma reserva
controller.save = (req, res) => {

    const nome = req.sanitize('nome').escape();
    req.check("nome", "O nome só pode conter letras!").isAlpha();

    //Verifica se ja existe um tipo de atividade com este nome
    mysqlConnection.query(GET_ONE_SQL, [req.body.nome], (err, rows, fields) => {
        if (rows.length > 0) {
            res.status(jsonMessages.db.duplicateRecord.status).send(jsonMessages.db.duplicateRecord);
        } else {
            //se passou as validacoes vai atribuir o perfil ao utilizador
            mysqlConnection.query(CREATE_TIPO_ATIVIDADE_SQL, [req.body.nome], (err, rows, field) => {
                if (!err) {
                    res.status(jsonMessages.db.successInsert.status).send(jsonMessages.db.successInsert);
                } else {
                    res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
                    //console.log(req.body.id_espaco, req.body.id_atividade);
                    //console.log(err);
                }
            })
        }
    })
};

/* //Atualizar uma reserva
controller.update = (req, res) => {
    //Verifica se estao presentes os parametros necessarios
    if ((!req.params.id_espaco) || (!req.params.id_atividade) || (!req.body.dataHora)) {
        res.status(jsonMessages.db.requiredData.status).send(jsonMessages.db.requiredData);
    } else {
        mysqlConnection.query(UPDATE_RESERVATION_SQL, [req.body.dataHora, req.params.id_espaco, req.params.id_atividade], (err, rows, fields) => {
            if (!err) {
                res.status(jsonMessages.db.successInsert.status).send(jsonMessages.db.successInsert);
            } else {
                res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
            }
        })
    }
}

controller.delete = (req, res) => {
    //Verifica se estao presentes os parametros necessarios
    if ((!req.params.id_espaco) || (!req.params.id_atividade)) {
        res.status(jsonMessages.db.requiredData.status).send(jsonMessages.db.requiredData);
    } else {
        mysqlConnection.query(DELETE_RESERVATION_SQL, [req.params.id_espaco, req.body.id_atividade], (err, rows, fields) => {
            if (!err) {
                res.status(jsonMessages.db.successDelete.status).send(jsonMessages.db.successDelete);
            } else {
                res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
            }
        })
    }
} */

module.exports = controller;