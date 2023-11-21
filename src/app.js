import express from "express";
import morgan from "morgan";
import clientesRoutes from "./routes/clients";
import transaccionesRoutes from "./routes/transactions";



const app = express();

// settings
app.set("port", process.env.PORT || 8090);


// middlewares
app.use(morgan("dev"));
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//routes
app.use("/api/clients",clientesRoutes);
app.use("/api/transactions",transaccionesRoutes); 


export default app;
