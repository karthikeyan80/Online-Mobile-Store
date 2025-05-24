import express from 'express';
import cors from 'cors';
import 'dotenv/config';

//App config

const app = express();
const port = process.env.PORT || 4000;

//middlewares

app.use(express.json());
app.use(cors());

//api endpoints

app.get('/', (req, res) => {
    res.send('API is running');
});

app.listen(port , () => {
    console.log(`Server is running on port ${port}`);
});