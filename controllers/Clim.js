const cors = require("cors");
const Clim = require("../models/Clim");
const fs = require("fs");
const Clim_routes = require("../routes/Clim");


exports.clim_get_all = (req, res) => {
  Clim.find({})
    .then((clim) => {
      if (clim) {
        // res.status(200).json({
        //   count: song.length,
        //   songs: song.map((doc) => {
        //     return {
        //       _id: doc._id,
        //       title: doc.title,
        //       artist: doc.artist,
        //       album: doc.album,
        //       date: doc.date,
        //       style: doc.style,
        //       time: doc.time,
        //       path: doc.path,
        //       request: {
        //         type: "GET",
        //         url: "https://sfm-project.herokuapp.com/songs/song/" + doc._id,
        //       },
        //     };
        //   }),
        // });
      } else {
        res.status(204).json({ error: "Aucune donnée" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.clim_get_id = (req, res) => {
  Clim.findOne({
    _id: req.params._id,
  })
    .then((clim) => {
      if (clim) {
        // res.status(200).json({
        //   song: song,
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

exports.clim_delete = (req, res) => {
  Clim.findOneAndRemove({
    _id: req.params._id,
  })
    .then((clim) => {
      if (clim) {
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
