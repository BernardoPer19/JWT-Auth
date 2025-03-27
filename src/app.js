import express from "express";
import { AuthRouter } from "./routes/Auth.routes.js";
import { userRoutes } from "./routes/UsersRoutes.routes.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/", AuthRouter);
app.use("/users", userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
