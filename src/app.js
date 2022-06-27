const express = require('express');
const cors = require('cors');
const routes  = require('./routes');

const app = express();
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

const db = require('./db/models');
db.sequelize.sync();

module.exports = app;

