import express from 'express';
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';
import rootRouter from './routes/index.js';
const port = 3000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use("/api/v1", rootRouter)

console.log('Dir: ', path.join(__dirname, '../public'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;