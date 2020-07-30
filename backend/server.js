import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import User from "./models/User";
import Recipe from "./models/Recipe";

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/cookBook");

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully!");
});

//Routes for recipes

router.route("/recipes").get((req, res) => {
  Recipe.find((err, recipes) => {
    if (err) console.log(err);
    else res.json(recipes);
  });
});
router.route("/recipes/:id").get((req, res) => {
  Recipe.findById(req.params.id, (err, recipe) => {
    if (err) console.log(err);
    else res.json(recipe);
  });
});

//Routes for users
router.route("/users").get((req, res) => {
  User.find((err, users) => {
    if (err) console.log(err);
    else res.json(users);
  });
});

router.route("/users/:id").get((req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) console.log(err);
    else res.json(user);
  });
});

router.route("/users/add").post((req, res) => {
  let user = new User(req.body);
  user
    .save()
    .then(user => {
      res.status(200).json({ user: "Added successfully" });
    })
    .catch(err => {
      res.status(400).send("Failed to create new record");
    });
});

router.route("/users/update/:id").post((req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (!user) return next(new Error("Could not load Document"));
    else {
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.email = req.body.email;
      user.password = req.body.password;

      user
        .save()
        .then(user => {
          res.json("Update done");
        })
        .catch(err => {
          res.status(400).send("Update failed");
        });
    }
  });
});

router.route("/users/delete/:id").get((req, res) => {
  User.findByIdAndRemove({ _id: req.params.id }, (err, user) => {
    if (err) res.json(err);
    else res.json("Removed successfully");
  });
});

app.use("/", router);

app.listen(4000, () => console.log(`Express server running on port 4000`));

/*
To start robo 3t
/opt/robo3t-1.3.1-linux-x86_64-7419c406/bin/robo3t


To start mongo

cd backend 
mongod

sudo lsof -iTCP -sTCP:LISTEN -n -P
sudo kill <mongo_command_pid>

*/
