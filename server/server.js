import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import sellerRoutes from "./routes/sellerRoutes.js";
<<<<<<< HEAD
import orderRoutes from "./routes/orderRoutes.js";
import supportPanelRoutes from "./routes/supportPanelRoutes.js";
import containerRoutes from "./routes/containerRoutes.js";
import carrerformRoutes from "./routes/carrerformRoutes.js";
import contactformRoutes from "./routes/contactformRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
=======
import containerRoutes from "./routes/containerRoutes.js";
>>>>>>> 71af4dab3e38be5620202153b03e237f1c2ee94f
import connecttoMongoDb from "./db/connectToMongoDb.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
<<<<<<< HEAD
// import path from "path";
// import { fileURLToPath } from "url";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// import { app } from "./socket/socket.js";
dotenv.config();

const app = express();

// // Serve static files from the React app
// app.use(express.static(path.join(__dirname, "../client/dist")));
// // All other routes should serve the React app
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
// });

const PORT = process.env.PORT || 5000;
const frontendUrl = process.env.FRONTEND_BASE_URL;
const adminUrl = process.env.ADMIN_BASE_URL;
=======
// import { app } from "./socket/socket.js";
const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;
>>>>>>> 71af4dab3e38be5620202153b03e237f1c2ee94f

app.use(express.json()); //to parse the incoming json(from req.body)
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
<<<<<<< HEAD
app.use(
  cors({
    origin: [frontendUrl, adminUrl],
    credentials: true,
    exposedHeaders: ["X-Auth-Token", "X-Admin-Token"],
  })
);
=======
app.use(cors());
>>>>>>> 71af4dab3e38be5620202153b03e237f1c2ee94f

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/containers", containerRoutes);
<<<<<<< HEAD
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/admin", supportPanelRoutes);
app.use("/api/carrerform", carrerformRoutes);
app.use("/api/contactform", contactformRoutes);

app.get("/", (req, res) => {
  res.send(`<p>Hello from the local!</p>`);
});
=======

>>>>>>> 71af4dab3e38be5620202153b03e237f1c2ee94f
app.listen(PORT, () => {
  connecttoMongoDb();
  console.log(process.env.MONGO_URI);
  console.log(`Server Running on port at ${PORT}`);
});
