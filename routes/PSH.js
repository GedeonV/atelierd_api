const express = require("express");
const psh = express.Router();
const cors = require("cors");
process.env.SECRET_KEY = "sfmprj88";
const PSHController = require("../controllers/PSH");

psh.use(cors());

psh.get("/", PSHController.psh_get_all);
psh.post("/create", PSHController.psh_create);
psh.get("/psh/:_id", PSHController.psh_get_id);
psh.delete("/:_id", PSHController.psh_delete);

module.exports = psh;
