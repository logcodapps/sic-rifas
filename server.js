import { fastify } from 'fastify'
import { DaoEndereco } from './dao-endereco.js'
const server = fastify()
const de = new DaoEndereco();


server.get('/', async (request, replay) => {
   return await de.ListDataEnderecos()
})

server.get('/buscar', async (request, replay) => {
    const search = request.query.search;
    return await de.buscarEnderecoPorLagradouro(search)
 })

server.post('/', async (request, replay) => {
    const { logradouro, descricao, cidade, estado, rota } = request.body
    await de.create({ logradouro, descricao, cidade, estado, rota })
    return replay.status(201).send()   
})

server.put('/:id', async (request, replay) => {
    const endereco_id = request.params.id;
    const {logradouro, descricao, cidade, estado, rota} = request.body
    await de.update(endereco_id,{ logradouro, descricao, cidade, estado, rota })
    return replay.status(204).send()   
})

server.delete('/:id', async (request, replay) => {
    const endereco_id = request.params.id;
    await de.remove(endereco_id)
    return replay.status(204).send()   
})
server.listen({ 
    host:'0.0.0.0',
    port: process.PORT ?? 4449,
 })

