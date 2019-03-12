module.exports = (sequelize, DataTypes) => {
    return sequelize.define('favs', {
        userid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        productid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    })
  }