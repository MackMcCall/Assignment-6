"use strict";
const express = require("express");
const router = express.Router();
const jokeController = require("../controllers/jokeController");

router.get("/", jokeController.fetchAllJokes);
router.get("/random", jokeController.fetchRandomJoke);
router.get("/categories", jokeController.fetchJokeCategories);
router.get("/category/:category", jokeController.fetchJokesByCategory);
router.get("/:id", jokeController.fetchJokeById);
router.post("/", jokeController.createJoke);
router.post("/add", jokeController.createJoke);
router.delete("/:id", jokeController.removeJoke);
module.exports = router;
