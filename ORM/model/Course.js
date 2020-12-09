const {DataTypes, Deferrable} = require('sequelize');
const sequelize = require('../sequelize');
const SportHall = require('./SportHall');
const Customer = require('./Customer');
const Room = require('./Room');

const Course = sequelize.define('course', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrementIdentity: true,
        primaryKey: true,
    },
    id_sport_hall: {
        type: DataTypes.INTEGER,
        references: {
            model: Room,
            key: 'id_sport_hall',
            deferrable: Deferrable.INITIALLY_IMMEDIATE
        },
    },
    id_room: {
        type: DataTypes.INTEGER,
        references: {
            model: Room,
            key: 'id_room',
            deferrable: Deferrable.INITIALLY_IMMEDIATE
        },
    },
    starting_date_time: {
        type: DataTypes.DATE
    },
    ending_date_time: {
        type: DataTypes.DATE
    },
    level: {
        type: DataTypes.STRING
    },
    activity: {
        type: DataTypes.STRING
    },
    id_instructor: {
        type: DataTypes.INTEGER,
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

module.exports = Course;

