const {DataTypes, Deferrable} = require('sequelize');
const sequelize = require('../sequelize');

const City = sequelize.define('city', {
    city_name: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    zip_code: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    country: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = City;