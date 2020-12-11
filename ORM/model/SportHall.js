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
        type: DataTypes.STRING
    },
    manager: {
        type: DataTypes.STRING,
        references: {
            model: Customer,
            key: 'email',
            deferrable: Deferrable.INITIALLY_IMMEDIATE
        },
    },
    phone_number:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    address:{
        type: DataTypes.STRING
    },
    city_name:{
        type: DataTypes.STRING
    },
    zip_code:{
        type: DataTypes.INTEGER
    },
    country:{
        type: DataTypes.STRING
    },
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = SportHall;
