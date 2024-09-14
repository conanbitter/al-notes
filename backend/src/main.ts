import fastify from 'fastify'
import fastifyStatic from '@fastify/static'
import path from 'node:path'

const server = fastify({ logger: true });

server.register(fastifyStatic, {
    root: path.join(__dirname, "../web"),
    index: false,
    serve: false,
});

server.register(fastifyStatic, {
    root: path.join(__dirname, "../web/static"),
    index: false,
    prefix: "/static/",
    decorateReply: false,
});

server.get('/', async (request, reply) => {
    return reply.sendFile("index.html");
})

server.get('/favicon.ico', async (request, reply) => {
    return reply.sendFile("favicon.ico");
})

server.listen({ port: 8080 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
})