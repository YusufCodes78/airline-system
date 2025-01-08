import express from "express";
import cors from "cors";
import connectDB from "./db/mongoose";
import userRouter from "./routes/UserRouter";
import flightRouter from "./routes/FlightRouter";
import passengerRouter from "./routes/PassengerRouter";

const app = express();
app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use("/api",flightRouter);
app.use("/api",passengerRouter);
await connectDB();


app.get("/", (req, res) => {
  res.send("Server is running!");
});

export default app;
