const express = require('express');
const authenticate = require('../middleware/auth');
const { create, list, getOne, update, delete: deleteOp, getCotacao } = require('../controllers/operacaoController');
const router = express.Router();

router.use(authenticate);

router.post('/', create);
router.get('/', list);
router.get('/:id', getOne);
router.put('/:id', update);
router.delete('/:id', deleteOp);
router.get('/cotacao/:ticker', getCotacao);

module.exports = router;