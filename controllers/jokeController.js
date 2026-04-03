"use strict";
const model = require("../models/jokeModel");

async function fetchAllJokes(req, res) {
    try {
        const jokes = await model.getAllJokes();
        res.json(jokes);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}

async function fetchJokeById(req, res) {
    const id = req.params.id;
    if (id) {
        try {
            const joke = await model.getOneJokeById(id);
            res.json(joke);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing required id param!");
    }
}

async function fetchRandomJoke(req, res) {
    try {
        const joke = await model.getRandomJoke();
        res.json(joke);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}

async function fetchJokeCategories(req, res) {
    try {
        const categories = await model.getJokeCategories();
        res.json(categories);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}

async function fetchJokesByCategory(req, res) {
    const category = req.params.category;
    const price = req.query.price;
    let params;
    if (category) {
        try {
            params = [category];
            if (price) {
                params.push(price);
            }
            const jokes = await model.getJokesByCategory(params);
            res.json(jokes);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing required type param!");
    }
}

async function removeJoke(req, res) {
    const id = req.params.id;
    if (id) {
        try {
            const deletedCount = await model.deleteJoke(id);
            if (deletedCount > 0) {
                res.send(`Joke with id ${id} deleted successfully.`);
            } else {
                res.status(404).send("Joke not found.");
            }
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing required id param!");
    }
}

async function createJoke(req, res) {
    const { setup, delivery, category } = req.body;
    if (setup && delivery && category) {
        try {
            const newJoke = await model.addJoke(setup, delivery, category);
            res.status(201).json(newJoke);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing required joke fields!");
    }
}

module.exports = {
    fetchAllJokes,
    fetchJokeById,
    fetchRandomJoke,
    fetchJokeCategories,
    fetchJokesByCategory,
    removeJoke,
    createJoke,
};
