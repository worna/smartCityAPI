const {DataTypes, Deferrable} = require('sequelize');
const sequelize = require('../sequelize');
const Customer = require('./Customer');
const SportHallCustomer = require('./SportHallCustomer');


const SportHall = sequelize.define('sport_hall', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrementIdentity: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    manager: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: Customer,
            key: 'email',
            deferrable: Deferrable.INITIALLY_IMMEDIATE
        },
    },
    phone_number:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    email:{
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
    },
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = SportHall;
