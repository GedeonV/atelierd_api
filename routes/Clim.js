const express = require("express");
const clim = express.Router();
const cors = require("cors");
process.env.SECRET_KEY = "sfmprj88";
const checkAuth = require("../middleware/check-auth");
// Middleware pour vérifier si l'utilisateur utilise un token valide
const ClimController = require("../controllers/Clim");


clim.use(cors());

clim.get("/", checkAuth, ClimController.clim_get_all);
clim.get("/clim/:_id", checkAuth, ClimController.clim_get_id);
clim.delete("/:_id", checkAuth, ClimController.clim_delete);

module.exports = clim;
