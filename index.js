require('dotenv').config();

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sequelize = require('./db');
sequelize.sync();

app.use(require('./middleware/headers'));

app.use(bodyParser.json());

/* EXPOSED ROUTES */
app.use('/api', require('./controllers/user_controller'));
//app.use('/api', require('./controllers/product_controller'));

/* PROTECTED ROUTES */
app.use(require('./middleware/validate-session'))
app.use('/api', require('./controllers/admin_product_controller'));

app.listen(process.env.PORT, () => console.log(`*** server app listening on ${process.env.PORT} ***`));