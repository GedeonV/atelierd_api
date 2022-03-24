const cors = require("cors");
const PSH = require("../models/PSH");
const fs = require("fs");
const PSH_routes = require("../routes/PSH");
const csv = require('fast-csv');

exports.psh_get_all = (req, res) => {
  PSH.find({})
    .then((psh) => {
      if (psh) {
        res.status(200).json({
          count: psh.length,
          refs: psh.map((doc) => {
            return {
              _id: doc._id,
              marque: doc.marque,
              modele: doc.modele,
              moteur: doc.moteur,
              date1: doc.date1,
              date2: doc.date2,
              ref: doc.ref,
              // request: {
              //   type: "GET",
              //   url: "https://sfm-project.herokuapp.com/songs/song/" + doc._id,
              // },
            };
          }),
        });
      } else {
        res.status(204).json({ error: "Aucune donnée" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.psh_create = (req, res) => {
  const today = new Date();
  const pshData = {
    modele: req.body.psh,
    marque: req.body.marque,
    moteur: req.body.moteur,
    date1: req.body.date1,
    date2: req.body.date2,
    ref: req.body.ref,
    created: today,
  };
  PSH
  .create(pshData)
  .then((psh) => {
    res.status(201).json({
      message: "Ref PSH ajouté avec succès",
      createdEvent: {
        modele: psh.modele,
        marque: psh.marque,
        moteur: psh.moteur,
        date1: psh.date1,
        date2: psh.date2,
        ref: psh.ref,
        _id: psh._id,
        // request: {
        //   type: "GET",
        //   url:
        //     "https://sfm-project.herokuapp.com/parties/event/" +
        //     party._id,
        // },
      },
    });
  })
  .catch((err) => {
    res.status(500).json({ error: err });
    console.log(err);
  });
};

exports.psh_upload = (req, res) => {
  const fileRows = [];
  // open uploaded file
  csv.fromPath(req.file.path)
    .on("data", function (data) {
      fileRows.push(data); // push each row
    })
    .on("end", function () {
      console.log(fileRows)
      fs.unlinkSync(req.file.path);   // remove temp file
      //process "fileRows" and respond
    })
}

exports.psh_get_id = (req, res) => {
  PSH.findOne({
    _id: req.params._id,
  })
    .then((psh) => {
      if (psh) {
        // res.status(200).json({
        //   psh: psh,
        //   request: {
        //     type: "GET",
        //     url: "https://sfm-project.herokuapp.com/songs/",
        //   },
        // });
      } else {
        res.status(404).json({ error: "Cette musique n'existe pas" });
      }
    })
    .catch((err) => {
      res.status(200).json({ error: err });
    });
};

exports.psh_delete = (req, res) => {
  PSH.findOneAndRemove({
    _id: req.params._id,
  })
    .then((psh) => {
      if (psh) {
        // res.status(200).json({
        //   message: "Musique supprimée",
        //   request: {
        //     type: "POST",
        //     url: "https://sfm-project.herokuapp.com/songs/upload",
        //   },
        // });
      } else {
        res.status(404).json({ error: "Impossible de supprimé" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};