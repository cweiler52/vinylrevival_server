require('dotenv').config();

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sequelize = require('./db').sequelize;
sequelize.sync();

app.use(require('./middleware/headers'));

app.use(bodyParser.json());

/* EXPOSED ROUTES */
app.use('/api', require('./controllers/user_controller'));
app.use('/api', require('./controllers/product_controller'));
app.use('/api', require('./controllers/comments_controller'));

/* PROTECTED ROUTES */
app.use(require('./middleware/validate-session'))
app.use('/api', require('./controllers/admin_products_controller'));
app.use('/api', require('./controllers/admin_comments_controller'));
app.use('/api', require('./controllers/favs_controller'));
app.use('/api', require('./controllers/profile_controller'));

app.listen(process.env.PORT, () => console.log(`*** server app listening on ${process.env.PORT} ***`));