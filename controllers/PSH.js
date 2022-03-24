const cors = require("cors");
const PSH = require("../models/PSH");
const fs = require("fs");
const PSH_routes = require("../routes/PSH");

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