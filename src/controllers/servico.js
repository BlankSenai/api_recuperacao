const { servicos } = require('../server/entities.js')
const { StatusCodes } = require('http-status-codes')

const getAll = (_, res) => {
    return res.status(StatusCodes.OK).json(servicos)
}

const getById = (req, res) => {
    const { id } = req.params

    const servico = servicos.filter(s => s.id === parseInt(id))

    if (servico.length != 0) {
        return res.status(StatusCodes.OK).json(servico)
    } else {
        return res.status(StatusCodes.NOT_FOUND).json({mensagem: "Serviço não encontrado"})
    }
}

const create = (req, res) => {
    const servico = req.body

    if (servico.descricao.length < 5) {
        return res.status(StatusCodes.BAD_REQUEST).json({mensagem: "'descricao' deve conter no mínimo 5 caracteres"})
    }

    if (servico.descricao.length > 100) {
        return res.status(StatusCodes.BAD_REQUEST).json({mensagem: "'descricao' deve conter no máximo 100 caracteres"})
    }
    
    if (servico.valores) {
        servico.valores.forEach(s => {
            if (s.valor < 0) {
                return res.status(StatusCodes.BAD_REQUEST).json({mensagem: `O valor para '${s.tamanho}' deve ser igual ou maior que 0`})
            }
        })
    }
    
    let id = 0
    servicos.forEach(c => {
        if (s.id > id) {
            id = s.id
        }
    })

    servico.id = id + 1

    servicos.push(servico)
    return res.status(StatusCodes.CREATED).json({mensagem: "Serviço cadastrado com sucesso"})
}

const deleteById = (req, res) => {
    const { id } = req.params

    const index = servicos.findIndex(s => s.id === parseInt(id))

    console.log(index)

    if (index < 0) {
        return res.status(StatusCodes.NOT_FOUND).json({mensagem: "Serviço não encontrado"})
    }

    servicos.splice(index, 1)

    return res.status(StatusCodes.OK).json({message: "Serviço removido com sucesso"})
}

const updateById = (req, res) => {
    const { id } = req.params
    const servicoBody = req.body

    if (parseInt(id) < 1) {
        return res.status(StatusCodes.BAD_REQUEST).json({mensagem:  "'codigo' deve ser maior que 0"})
    }

    if (servicoBody.descricao.length < 5) {
        return res.status(StatusCodes.BAD_REQUEST).json({mensagem: "'descricao' deve conter no mínimo 5 caracteres"})
    }

    if (servicoBody.descricao.length > 100) {
        return res.status(StatusCodes.BAD_REQUEST).json({mensagem: "'descricao' deve conter no máximo 100 caracteres"})
    }
    
    if (servicoBody.valores) {
        servicoBody.valores.forEach(s => {
            if (s.valor < 0) {
                return res.status(StatusCodes.BAD_REQUEST).json({mensagem: `O valor para '${s.tamanho}' deve ser igual ou maior que 0`})
            }
        })
    }

    const servico = servicos.find(s => s.id === parseInt(id))

    if (servico) {
        servico.descricao = servicoBody.descricao
        servico.valores = servicoBody.valores

        return res.status(StatusCodes.OK).json({mensagem: "Serviço atualizado com sucesso"})
    } else {
        return res.status(StatusCodes.NOT_FOUND).json({mensagem: "Serviço não encontrado"})
    }   
}

const ServicoController = {
    create,
    getAll,
    getById,
    deleteById,
    updateById
}

module.exports = ServicoController