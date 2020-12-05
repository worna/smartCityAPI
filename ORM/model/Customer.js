const {DataTypes} = require('sequelize');
const sequelize = require('../sequelize');

const Customer = sequelize.define('customer', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrementIdentity: true,
        primaryKey: true
    },
    first_name: {
        type: DataTypes.STRING
    },
    last_name: {
        type: DataTypes.STRING
    },
    birth_date: {
        type: DataTypes.DATE
    },
    gender: {
        type: DataTypes.INTEGER
    },
    phone_number: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    inscription_date: {
        type: DataTypes.DATE
    },
    is_manager: {
        type: DataTypes.INTEGER
    },
    is_instructor: {
        type: DataTypes.INTEGER
    },
    language: {
        type: DataTypes.STRING
    }
},{
    timestamps: false,
    freezeTableName: true
});

module.exports = Customer;

