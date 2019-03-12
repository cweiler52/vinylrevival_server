module.exports = (sequelize, DataTypes) => {
    return sequelize.define('users', {
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        passwordhash: {
          type: DataTypes.STRING,
          allowNull: false
        },
        roleid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        image: {
            type: DataTypes.STRING
        }
    })
  }