const {DataTypes} = require('sequelize');
const sequelize = require('../sequelize');

const Customer = sequelize.define('customer', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrementIdentity: true,
        primaryKey: true
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    birth_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    gender: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    inscription_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.NOW
    },
    is_manager: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    is_instructor: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    language: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    city_name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    zip_code:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    country:{
        type: DataTypes.STRING,
        allowNull: false,
    }
},{
    timestamps: false,
    freezeTableName: true
});

module.exports = Customer;

