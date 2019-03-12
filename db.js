const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DBNAME, 'postgres', process.env.DBPASS, {
    host: 'localhost',
    dialect: 'postgres'
});
// const sequelize = new Sequelize(process.env.DATABASE_URL, {
//     dialect: 'postgres'
// });

sequelize.authenticate().then(
    function() {
        console.log(`*** connected to db ***`);
    },
    function(err){
        console.log(err);
    }
);

module.exports = sequelize;