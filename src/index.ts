import express from 'express';
import { json } from 'body-parser';

const app = express()
app.use(json)

const PORT = 3333;

app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}...`)
})