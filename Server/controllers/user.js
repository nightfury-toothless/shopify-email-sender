const User = require("../models/user");

exports.getUser = (req, res) => {
  let query = req.query.store;
  User.find({
    store: query,
  }).exec((err, user) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: "NO user FOUND",
      });
    }
    const updatedUser = [
      {
        _id: user[0]._id,
        store: user[0].store,
        templates: user[0].templates,
      },
    ];
    res.json(updatedUser);
  });
};

exports.updateTemplate = (req, res) => {
  let query = req.query.store;
  User.findOneAndUpdate(
    {
      store: query,
    },
    {
      $push: {
        templates: {
          templateName: req.body.templateName,
          templateJson: req.body.templateJson,
        },
      },
    }
  ).exec((err, user) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: "NO user FOUND",
      });
    }
    res.json(user);
  });
};
