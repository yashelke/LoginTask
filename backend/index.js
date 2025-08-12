import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/userRoute.js";

dotenv.config();
console.log("JWT_SECRET from env:", process.env.JWT_SECRET);


const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users",router);

const PORT = process.env.PORT || 5000;


app.listen(PORT,()=>
{
    console.log(`Server is running on port ${PORT}`);
});

