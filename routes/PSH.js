const express = require("express");
const psh = express.Router();
const cors = require("cors");
process.env.SECRET_KEY = "sfmprj88";
//const checkAuth = require("../middleware/check-auth");
// Middleware pour vérifier si l'utilisateur utilise un token valide
const PSHController = require("../controllers/PSH");


psh.use(cors());

psh.get("/", PSHController.psh_get_all);
psh.get("/psh/:_id", PSHController.psh_get_id);
psh.delete("/:_id", PSHController.psh_delete);


module.exports = psh;
