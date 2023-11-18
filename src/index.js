import app from "./app";
import "./utils/mongoose";
import "./vendors/whatsapps";

app.listen(app.get("port"));
console.log(`server on port ${app.get("port")}`);
