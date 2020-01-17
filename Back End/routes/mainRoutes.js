const router = require('express').Router();
const isAuthenticated = require('../config/middleware/isAuthenticated');


/***************************************************************  Rota Raiz ***************************************************************************************/

router.get('/', function(req, res) {
    if(req.user) {
        res.redirect('/index');
    } else {
        res.json('Raiz');
    };
});

//Rota de teste temporaria
router.get("/index", isAuthenticated, function (req, res) {
    res.json('Index');
});


/***************************************************************  Rotas das Atividades ***************************************************************************************/

const AtividadesController = require('../controllers/atividadesController');


router.get('/atividades', AtividadesController.listAll);//devolve todos as atividades
router.get('/atividades/:id_atividade', AtividadesController.listOne);//devolve uma atividade
router.post('/atividades', isAuthenticated, AtividadesController.save);//insere uma atividade
router.put('/atividades/:id_atividade', isAuthenticated, AtividadesController.update);//atualiza uma atividade
router.delete('/atividades/:id_atividade', isAuthenticated, AtividadesController.delete);//elimina uma atividade



/***************************************************************  Rotas das Atividades com Participantes ***************************************************************************************/
/*
//devolve todos os participantes inscritos numa atividade
router.get('/atividades/:id/participantes', AtividadesController.list_participantes_atividade);

//devolve os dados da inscricao de um participante numa atividade
router.get('/atividades/:id_atividade/participantes/:id_utilizador/inscricao', AtividadesController.listone_inscricao);

//inscreve um utilizador numa atividade
router.post('/atividades/:id_atividade/participantes/:id_utilizador/inscrever', AtividadesController.register_participant);

//elimina a inscricao de um participante numa atividade
router.delete('/atividades/:id_atividade/participantes/:id_utilizador/apagarinscricao', AtividadesController.delete_participant);

//efetuar o pagamento de uma participante numa atividade
router.put('/atividades/:id_atividade/participantes/:id_utilizador/pagamento', AtividadesController.pagar_inscricao);


/***************************************************************  Rotas dos Espacos ***************************************************************************************/


const EspacosController = require('../controllers/espacosController');

router.get('/espacos', EspacosController.listAllEspacos);//devolve todos os espacos
router.get('/espacos/:id', EspacosController.listOneEspaco);//devolve um espaco
router.get('/espacos/patrocinadores', EspacosController.listAllPatrocinadores);//devolve todos os patrocinadores
router.get('/espacos/patrocinadores/:id', EspacosController.listOnePatrocinador);//devolve um patrocinador
router.get('/espaco/:id/patrocinios', EspacosController.listAllPatrocinios);//devolve todos os patrocinios de um espaço
router.get('/espaco/:id/patrocinios/:id', EspacosController.listOnePatrocinio);//devolve um patrocinio de um espaço
router.get('/espaco/:id/materiais', EspacosController.listAllMateriais);//devolve todos os materiais de um espaço
router.get('/espaco/:id/materiais/:id', EspacosController.listOneMaterial);//devolve um material de um espaço

router.post('/espacos', EspacosController.saveEspacos);//insere um espaco
router.post('/espaco/:id/patrocinadores', EspacosController.savePatrocinadores);//insere um patrocinador num espaço
router.post('/espaco/:id/materiais', EspacosController.saveMateriais);//insere um material num espaço

router.put('/espacos/:id', EspacosController.updateEspacos);//atualiza um espaco
router.put('/espaco/:id/patrocinadores/:id', EspacosController.updatePatrocinadores);//atualiza um patrocinionador de um espaço
router.put('/espaco/:id_espaco/materiais/:id', EspacosController.updateMateriais);//atualiza um material de um espaco


router.delete('/espacos/:id', EspacosController.deleteEspacos);//elimina um espaco
router.delete('/espaco/:id/patrocinadores/:id', EspacosController.deletePatrocinadores);//elimina um patrocinionador de um espaço
router.delete('/espaco/:id/materiais/:id', EspacosController.deleteMateriais);//elimina um material de um espaco


//router.post('/utilizadores/login', EspacosController.auth);//autentica - faz login a um utilizador


/***************************************************************  Rotas das Reservas ***************************************************************************************/

const ReservationsController = require('../controllers/reservasController');


router.get('/reservas', isAuthenticated, ReservationsController.listAll); //Devolve todas as reservas
router.get('/reservas/espaco/:id_espaco/atividade/:id_atividade', isAuthenticated, ReservationsController.listOne); //Devolve uma reserva
router.post('/reservas', ReservationsController.save); //Insere uma reserva
router.put('/reservas/espaco/:id_espaco/atividade/:id_atividade', isAuthenticated, ReservationsController.update); //Atualiza uma reserva
router.delete('/reservas/espaco/:id_espaco/atividade/:id_atividade', isAuthenticated, ReservationsController.delete); //Elimina um perfil


/***************************************************************  Rotas dos Utilizadores ***************************************************************************************/

const { check } = require('express-validator');

const UsersController = require('../controllers/utilizadoresController');


//devolve todos os utilziadores
router.get('/utilizadores', UsersController.listAll);

//devolve um utilizador
router.get('/utilizadores/:id_utilizador', UsersController.listOne);

//insere um utilizador
router.post('/utilizadores', UsersController.save);

//atualiza um utilizador
router.put('/utilizadores/:id_utilizador', UsersController.update);
  
//elimina um utilizador
router.delete('/utilizadores/:id_utilizador', UsersController.delete);

//autentica - faz login a um utilizador
router.post('/utilizadores/login', UsersController.auth);

//devolve todos os espacos visitados por um utilizador
router.get('/utilizadores/:id_utilizador/espacosvisitados', UsersController.visited_spaces);

//devolve todass as atividades realizadas por um utilizador
router.get('/utilizadores/:id_utilizador/atividadesrealizadas', UsersController.realized_ativities);

/********************************************************************** Rotas Email ****************************************************************************************/

const controllerMail = require('../controllers/mailController');
 
 
router.post('/email', controllerMail.send);
 
module.exports = router;

/********************************************************************** Rotas Tipo Atividade ****************************************************************************************/

const tiposAtividadesController = require('../controllers/tiposAtividadesController');

router.get('/tipos_atividades', tiposAtividadesController.listAll);
router.get('/tipos_atividades/:id_tipo_atividade', tiposAtividadesController.listOne);
router.post('/tipos_atividades', tiposAtividadesController.save);

/********************************************************************** Rota Submissao de Imagem ****************************************************************************************/

const gravarImagemController = require('../controllers/gravarImagemController');

router.post('/gravarImagem', gravarImagemController.saveImage);

/***************************************************************  Rotas Index Google ***************************************************************************************/

router.get('/index-google', (req, res) => {
    if (req.session.token) {
        res.cookie('token', req.session.token);
        res.json({
            status: 'session cookie set'
        });
    } else {
        res.cookie('token', '')
        res.json({
            status: 'session cookie not set'
        });
    }
});



module.exports = router;