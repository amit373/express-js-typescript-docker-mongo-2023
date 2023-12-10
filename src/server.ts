import dotenv from 'dotenv';
import express from 'express';

dotenv.config({
  path: `.env.${process.env['NODE_ENV']}`,
});

const app = express();

app.get('/', (_, res) => {
  return res.status(200).send({
    db: {
      host: process.env['DB_HOST'],
      port: process.env['DB_PORT'],
      database: process.env['DB_DATABASE'],
    },
  });
});

app.listen(+process.env['PORT']!, () => console.log(`Server is running on ENV: ${process.env['NODE_ENV']} PORT:${process.env['PORT']}`));
