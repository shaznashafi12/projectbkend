import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./utils/db.js";
import userrouter from "./routes/userroutes.js";
import trackrouter from "./routes/trackrouter.js";
import pregnancyroute from "./routes/pregnancyroutes.js";
import reportrouter from "./routes/report.js";
import orderrouter from "./routes/orderRoutes.js";
import productrouter from "./routes/productRoutes.js";
import periodsrouter from "./routes/periodsrouter.js";
import { fileURLToPath } from "url";
import path from "path";
import checklistRouter from "./routes/checklistRoute.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Static uploads (not used, but okay to keep)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 4000;

// Routes
app.use("/user", userrouter);
app.use("/Track", trackrouter);
app.use( "/Pregnancy", pregnancyroute);
app.use("/report", reportrouter);
app.use("/checklist", checklistRouter);
app.use("/api/orders", orderrouter);
app.use("/api/products", productrouter);
app.use("/cycle", periodsrouter);

connectDB().then(() => console.log("MongoDB connected"));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});