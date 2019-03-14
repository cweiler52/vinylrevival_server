const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function() {
        console.log(`*** connected to db ***`);
    },
    function(err){
        console.log(err);
    }
);

// module.exports = sequelize;


// Associations
const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Users = require('./models/users')(sequelize, Sequelize);
db.Products = require('./models/products')(sequelize, Sequelize);
db.Favs = require('./models/favs')(sequelize, Sequelize);
db.Comments = require('./models/comments')(sequelize, Sequelize);

db.Favs.belongsTo(db.Users, { onDelete: 'cascade' });
db.Favs.belongsTo(db.Products, { onDelete: 'cascade' });
db.Comments.belongsTo(db.Users, { onDelete: 'cascade' });
db.Comments.belongsTo(db.Products, { onDelete: 'cascade' });

db.Users.hasMany(db.Favs, { onDelete: 'cascade' });
db.Users.hasMany(db.Comments, { onDelete: 'cascade' });
db.Products.hasMany(db.Favs, { onDelete: 'cascade' });
db.Products.hasMany(db.Comments, { onDelete: 'cascade' });

module.exports = {
    db: db,
    sequelize: sequelize
};