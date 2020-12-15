const {DataTypes, Deferrable} = require('sequelize');
const sequelize = require('../sequelize');
const SportHall = require('./SportHall');

const Room = sequelize.define('room', {
    id_room: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    id_sport_hall: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: SportHall,
            key: 'id',
            deferrable: Deferrable.INITIALLY_IMMEDIATE
        },
    },
    max_capacity: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },

}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = Room;

