const express = require('express');
const authenticate = require('../middleware/auth');
const { atualizarTodos, listarAtivos } = require('../controllers/cotacaoController');
const router = express.Router();

router.use(authenticate);
router.get('/atualizar', atualizarTodos);
router.get('/ativos', listarAtivos);

module.exports = router;