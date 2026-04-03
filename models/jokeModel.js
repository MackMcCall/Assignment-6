"use strict";
const pool = require("./dbConnection");

async function getAllJokes() {
    const queryText = "SELECT * FROM jokes";
    const result = await pool.query(queryText);
    return result.rows;
}

async function getOneJokeById(id) {
    const queryText = "SELECT * FROM jokes where id= $1";
    const values = [id];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}

async function getRandomJoke() {
    const result = await pool.query(
        "SELECT * FROM jokes ORDER BY RANDOM() LIMIT 1;",
    );
    return result.rows[0];
}

async function getJokeCategories() {
    const result = await pool.query(
        "SELECT DISTINCT category FROM jokes WHERE category IS NOT NULL ORDER BY category;",
    );
    return result.rows.map((row) => row.category);
}

async function getJokesByCategory(params) {
    const queryText = "SELECT * FROM jokes where category= $1";
    const result = await pool.query(queryText, params);
    return result.rows;
}

async function deleteJoke(id) {
    let queryText = "DELETE FROM jokes WHERE id = $1 ";
    const values = [id];
    const result = await pool.query(queryText, values);
    return result.rowCount;
}

async function addJoke(setup, delivery, category) {
    let queryText =
        "INSERT INTO jokes (setup, delivery, category) VALUES ($1, $2, $3) RETURNING *";
    let values = [setup, delivery, category];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}
module.exports = {
    getAllJokes,
    getOneJokeById,
    getRandomJoke,
    getJokeCategories,
    getJokesByCategory,
    deleteJoke,
    addJoke,
};
