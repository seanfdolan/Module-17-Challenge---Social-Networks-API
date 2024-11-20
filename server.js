"use strict";
// const db = require('./config/connection');
// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// db.once('open', () => {
//     app.listen(3001, () => {
//         console.log('API server for social network running on port 3001!');
//     });
// });
const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
db.once("open", () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
});
