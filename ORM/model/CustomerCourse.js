const {DataTypes, Sequelize, Deferrable} = require('sequelize');
const sequelize = require('../sequelize');
const Customer = require('./Customer');
const Course = require('./Course');



const CustomerCourse = sequelize.define('customer_course', {
    email_customer: {
        type: DataTypes.STRING,
        primaryKey: true,
        references: {
            model: Customer,
            key: 'email',
            deferrable: Deferrable.INITIALLY_IMMEDIATE
        }
    },
    id_course: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Course,
            key: 'id',
            deferrable: Deferrable.INITIALLY_IMMEDIATE
        },
    }
}, {
    timestamps: false,
    freezeTableName: true
});



module.exports = CustomerCourse;
