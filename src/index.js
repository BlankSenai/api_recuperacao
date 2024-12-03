const server = require('./server/server.js')

server.listen(3000, () => console.log('Server rodando na porta 3000'))

module.exports = server