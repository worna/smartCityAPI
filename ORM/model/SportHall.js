const {DataTypes, Deferrable} = require('sequelize');
const sequelize = require('../sequelize');
const Customer = require('./Customer');


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
        type: DataTypes.INTEGER,
        references: {
            model: Customer,
            key: 'id',
            deferrable: Deferrable.INITIALLY_IMMEDIATE
        },
    },
    phone_number:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = SportHall;
