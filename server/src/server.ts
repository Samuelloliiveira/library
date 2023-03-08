import Fastify from 'fastify'

const app = Fastify()

app.get('/', async (request, reply) => {
  return { hello: 'world' }
})

app.listen({
  port: 3333,
}).then(() => {
  console.log('HTTP Server running')
})