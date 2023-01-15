const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes/route');
const Connection = require('./database/mongoose');

require('dotenv').config();

app.use("/uploads", express.static(__dirname + '/uploads'))
app.use(cors());
app.use(routes);

const port = process.env.PORT

app.listen(port, () => console.log(`server is running on port : ${port}`));

Connection();

module.exports = app