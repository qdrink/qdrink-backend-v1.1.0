import express from "express";
import morgan from "morgan";
import clientesRoutes from "./routes/clients";
import transaccionesRoutes from "./routes/transactions";



const app = express();

//cors
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  }
  
app.use(allowCrossDomain);

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
