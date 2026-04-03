"use strict";
const express = require("express");
const router = express.Router();
const jokeController = require("../controllers/jokeController");

router.get("/", jokeController.fetchAllJokes);
router.get("/:id", jokeController.fetchJokeById);
router.get("/type/:type", jokeController.fetchJokesByType);
router.post("/", jokeController.createJoke);
router.delete("/:id", jokeController.removeJoke);
module.exports = router;
