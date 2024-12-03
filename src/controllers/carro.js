const { carros, clientes } = require('../server/entities.js')
const { StatusCodes } = require('http-status-codes')

const getAll = (_, res) => {
    return res.status(StatusCodes.OK).json(carros)
}

const getById = (req, res) => {
    const { id } = req.params

    const carro = carros.filter(c => c.id === parseInt(id))

    if (carro.length != 0) {
        return res.status(StatusCodes.OK).json(carro)
    } else {
        return res.status(StatusCodes.NOT_FOUND).json({mensagem: "Carro não encontrado"})
    }
}

const create = (req, res) => {
    const carro = req.body

    if (carro.marca.length < 3) {
        return res.status(StatusCodes.BAD_REQUEST).json({mensagem: "'marca' deve conter mínimo 3 caracteres"})
    }
    
    if (carro.marca.length > 50) {
        return res.status(StatusCodes.BAD_REQUEST).json({mensagem: "'marca' deve conter no máximo 50 caracteres"})
    }

    if (carro.modelo.length < 2) {
        return res.status(StatusCodes.BAD_REQUEST).json({mensagem: "'modelo' deve conter mínimo 3 caracteres"})
    }
    
    if (carro.modelo.length > 50) {
        return res.status(StatusCodes.BAD_REQUEST).json({mensagem: "'modelo' deve conter no máximo 50 caracteres"})
    }
    
    if (carro.tamanho !== 'HATCH' && carro.tamanho !== "sedan" && carro.tamanho !== 'SUV' && carro.tamanho !== 'PICAPE') {
        return res.status(StatusCodes.BAD_REQUEST).json({mensagem: "'tamanho' deve ser HATCH, SEDAN, SUV ou PICAPE"})
    }
    
    if (carro.id_cliente) {
        const cliente = clientes.find(c => c.id === parseInt(carro.id_cliente))

        if (!cliente) {
            return res.status(StatusCodes.BAD_REQUEST).json({mensagem: "'id_cliente' não corresponde a um cliente cadastrado"})
        }
    }

    let id = 0
    carros.forEach(c => {
        if (c.id > id) {
            id = c.id
        }
    })

    carro.id = id + 1

    carros.push(carro)
    return res.status(StatusCodes.CREATED).json({mensagem: "Carro cadastrado com sucesso"})
}

const deleteById = (req, res) => {
    const { id } = req.params

    const index = carros.findIndex(c => c.id === parseInt(id))

    console.log(index)

    if (index < 0) {
        return res.status(StatusCodes.NOT_FOUND).json({mensagem: "Carro não encontrado"})
    }

    carros.splice(index, 1)

    return res.status(StatusCodes.OK).json({message: "Carro removido com sucesso"})
}

const updateById = (req, res) => {
    const { id } = req.params
    const carroBody = req.body

    if (parseInt(id) < 1) {
        return res.status(StatusCodes.BAD_REQUEST).json({mensagem:  "'codigo' deve ser maior que 0"})
    }

    if (carroBody.marca.length < 3) {
        return res.status(StatusCodes.BAD_REQUEST).json({mensagem: "'marca' deve conter mínimo 3 caracteres"})
    }
    
    if (carroBody.marca.length > 50) {
        return res.status(StatusCodes.BAD_REQUEST).json({mensagem: "'marca' deve conter no máximo 50 caracteres"})
    }

    if (carroBody.modelo.length < 2) {
        return res.status(StatusCodes.BAD_REQUEST).json({mensagem: "'modelo' deve conter mínimo 3 caracteres"})
    }
    
    if (carroBody.modelo.length > 50) {
        return res.status(StatusCodes.BAD_REQUEST).json({mensagem: "'modelo' deve conter no máximo 50 caracteres"})
    }
    
    if (carroBody.tamanho !== 'HATCH' && carroBody.tamanho !== "sedan" && carroBody.tamanho !== 'SUV' && carroBody.tamanho !== 'PICAPE') {
        return res.status(StatusCodes.BAD_REQUEST).json({mensagem: "'tamanho' deve ser HATCH, SEDAN, SUV ou PICAPE"})
    }
    
    if (carroBody.id_cliente) {
        const cliente = clientes.find(c => c.id === parseInt(carroBody.id_cliente))

        if (!cliente) {
            return res.status(StatusCodes.BAD_REQUEST).json({mensagem: "'id_cliente' não corresponde a um cliente cadastrado"})
        }
    }

    const carro = carros.find(c => c.id === parseInt(id))

    if (carro) {
        carro.marca = carroBody.marca
        carro.modelo = carroBody.modelo
        carro.tamanho = carroBody.modelo
        carro.id_cliente = carroBody.id_cliente

        return res.status(StatusCodes.OK).json({mensagem: "Carro atualizado com sucesso"})
    } else {
        return res.status(StatusCodes.NOT_FOUND).json({mensagem: "Carro não encontrado"})
    }   
}

const CarroController = {
    create,
    getAll,
    getById,
    deleteById,
    updateById
}

module.exports = CarroController