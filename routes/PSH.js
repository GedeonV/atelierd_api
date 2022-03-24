const express = require("express");
const psh = express.Router();
const cors = require("cors");
const PSHController = require("../controllers/PSH");
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

psh.use(cors());

psh.get("/", PSHController.psh_get_all);
psh.post("/create", PSHController.psh_create);
psh.post("/upload", upload.single('file'),PSHController.psh_upload);
psh.get("/psh/:_id", PSHController.psh_get_id);
psh.delete("/:_id", PSHController.psh_delete);

module.exports = psh;
