const {DataTypes, Sequelize, Deferrable} = require('sequelize');
const sequelize = require('../sequelize');
const SportHall = require('./SportHall');
const Customer = require('./Customer');

const SportHallCustomer = sequelize.define('sport_hall_customer', {
    id_sport_hall: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: SportHall,
            key: 'id',
            deferrable: Deferrable.INITIALLY_IMMEDIATE
        }
    },
    id_customer: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Customer,
            key: 'id',
            deferrable: Deferrable.INITIALLY_IMMEDIATE
        },
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = SportHallCustomer;
