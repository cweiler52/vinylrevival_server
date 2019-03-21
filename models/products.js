module.exports = (sequelize, DataTypes) => {
    return sequelize.define('products', {
        artist: {
          type: DataTypes.STRING
        },
        album: {
          type: DataTypes.STRING
        },
        cover: {
          type: DataTypes.STRING
        },
        price: {
          type: DataTypes.INTEGER
        },
        desc: {
            type: DataTypes.TEXT
        },
        genre: {
          type: DataTypes.STRING
        }
    })
  }