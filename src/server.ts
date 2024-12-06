import express from "express";
import bodyParser, { json } from "body-parser";
import mongoose from "mongoose";
import router from "./routes/formRoutes";
import cors from 'cors';

const SERVER_URL = "mongodb://localhost:27017"
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/forms', router);

mongoose.connect(`${SERVER_URL}`).then(() => console.log("Connected to MongoDB...")).catch((error) => console.log("Failed to connect to MongoDB..."));

app.listen(100, async () => {
    console.log(`Listening on port 4002`);
});
