import express from 'express';
import cors from 'cors';
import client from './config/db.js';
import datarouter from './routes/Datarouter.js'
import createTable from './model/storingdata.js'

const app = express()

app.use(express.json())

app.use(cors())

await client.connect();
createTable();



app.use('/api/quadbtech',datarouter)

app.listen(
    5000,
    console.log(`Server running on PORT 5000...`)
  );