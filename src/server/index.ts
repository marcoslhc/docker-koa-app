import * as Koa from 'koa';
import { createClient as createRedisClient } from 'redis';
import { MongoClient, Db, MongoError, Collection } from 'mongodb';
const Router = require('koa-router')
// const redis = createRedisClient('redis://redis:6379');
const app:Koa = new Koa();
const app_router = Router();
const APP_PORT = 3000;

function connect(url: string): Promise<Db> {
  const client = new MongoClient();
  return new Promise((resolve, reject) => {
    try {
      return client.connect(
        url,
        (err: MongoError, db: Db) => err ? reject(err) : resolve(db)
      );
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
}

function getCollection(collectionName: string): Function {
  return function (db: Db): Promise<Collection> {
    return Promise.resolve(db.collection(collectionName));
  }
}

function insertOne(collection: Collection, data: any) {
  return new Promise((resolve, reject) => {
    collection.insertOne(data, (err, result) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      return resolve(result);
    });
  });
}

app.use(async (ctx:Koa.Context, next:Function) => {
  const ts = new Date();
  const before = Date.now();
  ctx.state.logInfo = { ts, before };

  await next();
  const time: Number = Date.now() - before;
});

app.use(async (ctx:Koa.Context, next: Function) => {
  await next();
  try {
    const {ts, before} = ctx.state.logInfo;
    const time: Number = Date.now() - before;
    const db: Db = await connect('mongodb://mongo:27017/local');
    const collection: Collection = await getCollection('logs')(db);
    const log = `[${ts.toISOString()} - ${time}ms] ${ctx.url} - Status ${ctx.status}`;
    console.log(log);
    await insertOne(collection, { log: log });
    await db.close();
  } catch (e) {
    console.log(e.message);
    console.trace(e);
  }
});

app_router.get('', async (ctx: Koa.Context) => {
  ctx.status = 200;
  console.log(ctx.status);
  ctx.body = `hello world`;
});

app_router.get('/users/:user', async (ctx: Koa.Context) => {
  ctx.status = 200;
  ctx.body = `hello ${ctx.params.user}`;
});

app.use(app_router.routes());

app.listen(APP_PORT);
