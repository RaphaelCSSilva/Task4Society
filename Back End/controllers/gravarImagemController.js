const path = require('path');

const controller = {};

const mysqlConnection = require('../config/connectMySQL');
const jsonMessages = require('../assets/jsonMessages/bd');

const SAVE_IMAGE_SQL = 'UPDATE atividades SET imagem = ? WHERE nome = ?';

controller.saveImage = (req, res) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(__dirname + '../public/img/atividades'))
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now())
        }
    });
    const upload = multer({ storage: storage }).single('imagemAtividade');

    const nome = req.body.nomeAtividade;

    upload(req, res, function (err) {
        if (err) {
            return res.end("Error uploading file." + err);
        } else {
            const path = '../public/img/atividades' + req.file.filename;
            if (path != "NULL" && typeof (path) != 'undefined') {
                mysqlConnection.query(SAVE_IMAGE_SQL, [path, nome],
                    function (err, rows, fields) {
                        console.log(query.sql);
                        if (!err) {
                            res.status(jsonMessages.db.successUpdate.status).send(jsonMessages.db.successUpdate);
                        } else {
                            res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
                        }
                    });

            } else {
                res.status(jsonMessages.db.requiredData.status).send(jsonMessages.db.requiredData);
            }
        }
    })
}


module.exports = controller;