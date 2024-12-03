const { agendamentos, carros, servicos } = require('../server/entities.js')
const { StatusCodes } = require('http-status-codes')

const get = (_, res) => {
    return res.status(StatusCodes.OK).json(agendamentos)
}

const create = (req, res) => {
    const agendamento = req.body

    if (agendamento.id_carro) {
        const carro = carros.find(c => c.id === agendamento.id_carro)

        if (!carro) {
            return res.status(StatusCodes.BAD_REQUEST).json({mensagem: "'id_carro' não corresponde a um carro cadastrado"})
        }
    }
    
    if (agendamento.id_servico) {
        const servico = servicos.find(c => c.id === agendamento.id_servico)
        
        if (!servico) {
            return res.status(StatusCodes.BAD_REQUEST).json({mensagem: "'id_servico' não corresponde a um serviço cadastrado"})
        }
    }
    
    if (!agendamento.data_hora) {
        return res.status(StatusCodes.BAD_REQUEST).json({mensagem: "'data_hora' deve ser informado"})
    }

    agendamentos.push(agendamento)

    return res.status(StatusCodes.CREATED).json({mensagem: "Agendamento cadastrado com sucesso"})
}

const AgendamentoController = {
    get,
    create
}

module.exports = AgendamentoController