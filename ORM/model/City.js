const {DataTypes, Deferrable} = require('sequelize');
const sequelize = require('../sequelize');

const City = sequelize.define('city', {
    city_name: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    zip_code: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    country: {
        type: DataTypes.STRING,
        primaryKey: true,
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = City;