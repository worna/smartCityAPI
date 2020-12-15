const {DataTypes, Deferrable} = require('sequelize');
const sequelize = require('../sequelize');
const SportHall = require('./SportHall');
const Customer = require('./Customer');
const CustomerCourse = require('./CustomerCourse');
const Room = require('./Room');


const Course = sequelize.define('course', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrementIdentity: true,
        primaryKey: true,
    },
    id_sport_hall: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Room,
            key: 'id_sport_hall',
            deferrable: Deferrable.INITIALLY_IMMEDIATE
        },
    },
    id_room: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Room,
            key: 'id_room',
            deferrable: Deferrable.INITIALLY_IMMEDIATE
        },
    },
    starting_date_time: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    ending_date_time: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    level: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    activity: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    instructor: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: Customer,
            key: 'email',
            deferrable: Deferrable.INITIALLY_IMMEDIATE
        },
    },
}, {
    timestamps: false,
    freezeTableName: true,
});

module.exports = Course;

