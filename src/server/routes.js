const { Router } = require('express')

const ClienteController = require('../controllers/cliente.js')
const CarrosController = require('../controllers/carro.js')
const ServicoController = require('../controllers/servico.js')
const AgendamentoController = require('../controllers/agendamento.js')

const router = Router()

router.get('/clientes', ClienteController.getAll)
router.get('/clientes/:id', ClienteController.getById)
router.post('/clientes', ClienteController.create)
router.delete('/clientes/:id', ClienteController.deleteById)
router.put('/clientes/:id', ClienteController.updateById)

router.get('/carros', CarrosController.getAll)
router.get('/carros/:id', CarrosController.getById)
router.post('/carros', CarrosController.create)
router.delete('/carros/:id', CarrosController.deleteById)
router.put('/carros/:id', CarrosController.updateById)

router.get('/servicos', ServicoController.getAll)
router.get('/servicos/:id', ServicoController.getById)
router.post('/servicos', ServicoController.create)
router.delete('/servicos/:id', ServicoController.deleteById)
router.put('/servicos/:id', ServicoController.updateById)

router.get('/agendamentos', AgendamentoController.get)
router.post('/agendamentos', AgendamentoController.create)


module.exports = router