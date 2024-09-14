import { fastify, FastifyInstance } from 'fastify'
import fastifyStatic from '@fastify/static'
import path from 'node:path'

import { getNoteTree } from './notes'


/*const creationDate = new Date().toISOString();
db.insertInto("notes").values({
    title: "New note 3",
    created_at: creationDate,
    updated_at: creationDate,
    content: "content 3"
}).executeTakeFirstOrThrow().then((value) => { console.log(value.insertId) }, (reason) => { console.log(reason) });*/

//db.selectFrom("notes").select("title").execute().then((result: Partial<NotesTable>[]) => { console.log(result) });

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

server.get('/tree', async (request, reply) => {
    return await getNoteTree();
})

server.listen({ port: 8080 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
})