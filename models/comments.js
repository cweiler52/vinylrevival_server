module.exports = (sequelize, DataTypes) => {
    return sequelize.define('comments', {
        userid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        productid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    })
  }