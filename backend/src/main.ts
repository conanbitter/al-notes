import fastify from 'fastify'
import fastifyStatic from '@fastify/static'
import path from 'node:path'

import { Database } from './database'
import SQLite from 'better-sqlite3'
import { Kysely, SqliteDialect } from 'kysely'

const dialect = new SqliteDialect({
    database: new SQLite(path.join(__dirname, "../web/data.db")),
})

const db = new Kysely<Database>({
    dialect,
})


/*const creationDate = new Date().toISOString();
db.insertInto("notes").values({
    title: "New note 3",
    created_at: creationDate,
    updated_at: creationDate,
    content: "content 3"
}).executeTakeFirstOrThrow().then((value) => { console.log(value.insertId) }, (reason) => { console.log(reason) });*/

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

server.decorate('db', db);

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