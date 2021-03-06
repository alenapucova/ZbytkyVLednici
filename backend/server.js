import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const Recipe = require("./models/Recipe");
const User = require("./models/User");
const Ingredient = require("./models/Ingredient");
const jwt = require("jsonwebtoken");

const config = require("./config/database");

const passport = require("passport");
const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

mongoose.connect("mongodb://localhost:27017/cookBook");

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully!");
});

const port = process.env.PORT || 8080;
//routes for users
router.route("/users").get((req, res) => {
  User.find((err, users) => {
    if (err) console.log(err);
    else res.json(users);
  });
});

router.route("/users/register").post((req, res, next) => {
  let newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  });

  User.addUser(newUser, (err, user) => {
    if (err) {
      res.json({ success: false, message: "Failed to register user" });
    } else {
      const token = jwt.sign({ data: user }, config.secret, {
        expiresIn: 604800 //1 week
      });

      res.json({
        success: true,
        token: "JWT " + token,
        message: "User has been registered",
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        }
      });
    }
  });
});

router.route("/users/authenticate").post((req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.getUserByUsername(email, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign({ data: user }, config.secret, {
          expiresIn: 604800 //1 week
        });

        res.json({
          success: true,
          token: "JWT " + token,
          user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
          }
        });
      } else {
        return res.json({ success: false, message: "Wrong password" });
      }
    });
  });
});

router.get(
  "/users/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.json({
      user: req.user
    });
  }
);
router.route("/user/:userID/favouriteRecipes").get((req, res) => {
  const userID = req.params.userID;
  console.log(userID);

  User.getUserById(userID, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    } else {
      return res.json(user.favouriteRecipes);
    }
  });
});

router.route("/user/:userID/favouriteRecipes/:recipeID").get((req, res) => {
  const userID = req.params.userID;
  const recipeID = req.params.recipeID;

  User.getUserById(userID, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    if (user.favouriteRecipes) {
      if (user.favouriteRecipes.find(e => e.id === recipeID)) {
        user.favouriteRecipes = user.favouriteRecipes.filter(recipe => recipe._id !== recipeID);
      } else {
        user.favouriteRecipes.push(recipeID);
      }

      User.saveUser(user, (err, user) => {
        if (err) {
          res.json({ success: false, message: "Failed to save" });
        } else {
          res.json({ success: true, message: "User has been saved", user });
        }
      });
    } else {
      user.favouriteRecipes = [recipeID];
    }
  });
});

router.route("/user/:userID/setFavouriteIngredients").post((req, res) => {
  const userID = req.params.userID;
  const ingredients = req.body;
  console.log('ingredients', ingredients);

  User.getUserById(userID, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    if (user.favouriteIngredients) {
      user.favouriteIngredients = [];
      user.favouriteIngredients = ingredients;

      User.saveUser(user, (err, user) => {
        if (err) {
          res.json({ success: false, message: "Failed to save" });
        } else {
          res.json({ success: true, message: "User has been saved", user });
        }
      });
    } else {
      user.favouriteIngredients = [ingredients];
    }
  });
});

router.route("/user/:userID/favouriteIngredients").get((req, res) => {
  const userID = req.params.userID;
  console.log(userID);

  User.getUserById(userID, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    } else {
      Ingredient.find((err, ingredients) => {
        if (err) console.log(err);
        else {
          user.favouriteIngredients.forEach(favIng => {
            const richIngredient = ingredients.find(
              item => item._id.toString() === favIng._id.toString()
            );
            if (richIngredient) {
              favIng.name = richIngredient.name;
              favIng.unit = richIngredient.unit;
            }
          });
          res.json(user.favouriteIngredients);
        }
      });
    }
  });
});
//Routes for recipes

router.route("/recipes").get((req, res) => {
  Recipe.find((err, recipes) => {
    if (err) console.log(err);
    else {
      Ingredient.find((err, ingredients) => {
        if (err) console.log(err);
        else {
          recipes.forEach(recipe => {
            recipe.ingredients.forEach(ingredient => {
              const richIngredient = ingredients.find(
                item => item._id.toString() === ingredient._id.toString()
              );
              if (richIngredient) {
                ingredient.name = richIngredient.name;
                ingredient.unit = richIngredient.unit;
              }
            });
          });
          res.json(recipes);
        }
      });
    }
  });
});

router.route("/recipe/:id").get((req, res, next) => {
  const id = req.params.id;
  console.log(id);

  Recipe.getRecipeById(id, (err, recipe) => {
    if (err) throw err;
    if (!recipe) {
      return res.json({ success: false, message: "Recipe not found" });
    } else {
      Ingredient.find((err, ingredients) => {
        if (err) console.log(err);
        else {
          recipe.ingredients.forEach(ingredient => {
            const richIngredient = ingredients.find(item => item._id.toString() === ingredient._id.toString());
            if (richIngredient) {
              ingredient.name = richIngredient.name;
              ingredient.unit = richIngredient.unit;
            }
          });
          return res.json(recipe);
        }
      });
    }
  });
});

//routes for ingredient
router.route("/ingredients").get((req, res) => {
  Ingredient.find((err, ingredients) => {
    if (err) console.log(err);
    else res.json(ingredients);
  });
});
router.route("/ingredient/:id").get((req, res, next) => {
  const id = req.params.id;
  console.log(id);

  Ingredient.getIngredient(id, (err, ingredient) => {
    if (err) throw err;
    if (!ingredient) {
      return res.json({ success: false, message: "Ingredient not found" });
    } else {
      return res.json({
        _id: ingredient._id,
        name: ingredient.name,
        unit: ingredient.unit
      });
    }
  });
});

app.use("/api", router);

app.listen(port, () => console.log(`Express server running on port 4000`));



module.exports = router;

/*
To start robo 3t
/opt/robo3t-1.3.1-linux-x86_64-7419c406/bin/robo3t


To start mongo

cd backend
mongod

sudo lsof -iTCP -sTCP:LISTEN -n -P
sudo kill <mongo_command_pid>


*/
