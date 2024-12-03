const { clientes } = require('../server/entities.js')
const { StatusCodes } = require('http-status-codes')

const getAll = (_, res) => {
    return res.status(StatusCodes.OK).json(clientes)
}

const getById = (req, res) => {
    const { id } = req.params

    const cliente = clientes.filter(c => c.id === parseInt(id))

    if (cliente.length != 0) {
        return res.status(StatusCodes.OK).json(cliente)
    } else {
        return res.status(StatusCodes.NOT_FOUND).json({mensagem: "Cliente não encontrado"})
    }
}

const create = (req, res) => {
    const cliente = req.body

    if (cliente.nome.length < 3) {
        return res.status(StatusCodes.BAD_REQUEST).json({mensagem: "'nome' deve conter no mínimo 3 caracteres"})
    }
    
    if (cliente.nome.length > 100) {
        return res.status(StatusCodes.BAD_REQUEST).json({mensagem: "'nome' deve conter no máximo 100 caracteres"})
    }
    
    if (String(cliente.telefone).length != 11) {
        return res.status(StatusCodes.BAD_REQUEST).json({mensagem: "'telefone' deve conter exatamente 11 dígitos"})
    }
    
    if (typeof cliente.telefone != 'number') {
        console.log(typeof cliente.telefone)
        return res.status(StatusCodes.BAD_REQUEST).json({mensagem: "'telefone' deve conter apenas números"})
    }

    let id = 0
    clientes.forEach(c => {
        if (c.id > id) {
            id = c.id
        }
    })

    cliente.id = id + 1

    clientes.push(cliente)
    return res.status(StatusCodes.CREATED).json({mensagem: "Cliente cadastrado com sucesso"})
}

const deleteById = (req, res) => {
    const { id } = req.params

    const index = clientes.findIndex(c => c.id === parseInt(id))

    console.log(index)

    if (index < 0) {
        return res.status(StatusCodes.NOT_FOUND).json({mensagem: "Cliente não encontrado"})
    }

    clientes.splice(index, 1)

    return res.status(StatusCodes.OK).json({message: "Cliente removido com sucesso"})
}

const updateById = (req, res) => {
    const { id } = req.params
    const clienteBody = req.body

    if (parseInt(id) < 1) {
        return res.status(StatusCodes.BAD_REQUEST).json({mensagem:  "'codigo' deve ser maior que 0"})
    }

    if (clienteBody.nome.length < 3) {
        return res.status(StatusCodes.BAD_REQUEST).json({mensagem: "'nome' deve conter no mínimo 3 caracteres"})
    }
    
    if (clienteBody.nome.length > 100) {
        return res.status(StatusCodes.BAD_REQUEST).json({mensagem: "'nome' deve conter no máximo 100 caracteres"})
    }
    
    if (String(clienteBody.telefone).length != 11) {
        return res.status(StatusCodes.BAD_REQUEST).json({mensagem: "'telefone' deve conter exatamente 11 dígitos"})
    }
    
    if (typeof clienteBody.telefone != 'number') {
        console.log(typeof cliente.telefone)
        return res.status(StatusCodes.BAD_REQUEST).json({mensagem: "'telefone' deve conter apenas números"})
    }

    const cliente = clientes.find(c => c.id === parseInt(id))

    if (cliente) {
        cliente.nome = clienteBody.nome
        cliente.telefone = clienteBody.telefone

        return res.status(StatusCodes.OK).json({mensagem: "Cliente atualizado com sucesso"})
    } else {
        return res.status(StatusCodes.NOT_FOUND).json({mensagem: "Cliente não encontrado"})
    }   
}

const ClienteController = {
    create,
    getAll,
    getById,
    deleteById,
    updateById
}

module.exports = ClienteController