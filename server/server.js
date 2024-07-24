import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import sellerRoutes from "./routes/sellerRoutes.js";
import containerRoutes from "./routes/containerRoutes.js";
import connecttoMongoDb from "./db/connectToMongoDb.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
// import { app } from "./socket/socket.js";
const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(express.json()); //to parse the incoming json(from req.body)
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/containers", containerRoutes);

app.listen(PORT, () => {
  connecttoMongoDb();
  console.log(process.env.MONGO_URI);
  console.log(`Server Running on port at ${PORT}`);
});
