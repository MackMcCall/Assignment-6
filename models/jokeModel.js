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

async function getJokesByType(params) {
    const queryText = "SELECT * FROM jokes where type= $1";
    if (params.length > 1) {
        queryText += " AND price <= $2";
    }
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
    getJokesByType,
    deleteJoke,
    addJoke,
};
