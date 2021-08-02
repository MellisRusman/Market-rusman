require("dotenv").config()
const Servidor = require("./models/server");

const servidor = new Servidor();

servidor.listen();