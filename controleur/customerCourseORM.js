const CustomerORM = require('../ORM/model/Customer');
const CourseORM = require('../ORM/model/Course');
const CustomerCourseORM = require('../ORM/model/CustomerCourse');
const sequelize = require("../ORM/sequelize");
const {Sequelize} = require("sequelize");

module.exports.postCustomerCourse = async (req, res) => {
    const {customer, course} = req.body;
    try{
        await sequelize.transaction( {
            deferrable:  Sequelize.Deferrable.SET_DEFERRED
        }, async (t) => {
            const customerDB = await CustomerORM.findOne({where: {id: customer}});
            if(customerDB === null){
                throw new Error("Customer id not valid");
            }
            const courseDB = await CourseORM.findOne({where: {id: course}});
            if(courseDB === null){
                throw new Error("Course id not valid");
            }
            await CustomerCourseORM.create({
                id_customer: customer,
                id_course: course
            }, {transaction: t});
        });
        res.sendStatus(201);
    } catch (error){
        console.log(error);
        if(error.message === "Course id not valid"){
            res.status(404).send( "The course id is not valid");
        }else if(error.message === "Customer id not valid"){
            res.status(404).send("The customer id is not valid");
        } else{
            res.sendStatus(500);
        }
    }
}

module.exports.getCustomersInCourse = async (req, res) => {
    const idTexte = req.params.id;
    const id = parseInt(idTexte);
    try{
        if(isNaN(id)){
            console.log("The id is not a number");
            res.sendStatus(400);
        } else {
            const courseDB = await CourseORM.findOne({where: {id: id}});
            if(courseDB === null){
                throw new Error("Course id not valid");
            }
            const customersInCourse = await CustomerCourseORM.findAll({where: {id_course: id}});
            if(customersInCourse !== null){
                const customers = [];
                for (const customerInCourse of customersInCourse) {
                    const customer = await CustomerORM.findOne({where: {id: customerInCourse.id_customer}});
                    customers.push({customer});
                }
                res.json(customers);
            } else {
                console.log("No customers for this course");
                res.sendStatus(404);
            }
        }
    } catch (error){
        console.log(error);
        res.sendStatus(500);
    }
}

module.exports.getCoursesOfCustomer = async (req, res) => {
    const idTexte = req.params.id;
    const id = parseInt(idTexte);
    try{
        if(isNaN(id)){
            console.log("The id is not a number");
            res.sendStatus(400);
        } else {
            const customerDB = await CustomerORM.findOne({where: {id: id}});
            if(customerDB === null){
                throw new Error("Customer id not valid");
            }
            const coursesOfCustomer = await CustomerCourseORM.findAll({where: {id_customer: id}});
            if(coursesOfCustomer !== null){
                const courses = [];
                for (const courseOfCustomer of coursesOfCustomer) {
                    const course = await CourseORM.findOne({where: {id: courseOfCustomer.id_course}});
                    courses.push({course});
                }
                res.json(courses);
            } else {
                console.log("No course for this customer");
                res.sendStatus(404);
            }
        }
    } catch (error){
        console.log(error);
        res.sendStatus(500);
    }
}

module.exports.deleteCustomerCourse = async (req, res) => {
    const {customer, course} = req.body;
    try{
        await CustomerCourseORM.destroy({where: {id_customer: customer, id_course: course}});
        res.sendStatus(204);
    } catch (error){
        console.log(error);
        res.sendStatus(500);
    }
}