const CustomerORM = require('../ORM/model/Customer');
const CourseORM = require('../ORM/model/Course');
const CustomerCourseORM = require('../ORM/model/CustomerCourse');
const SportHallORM = require ('../ORM/model/SportHall');
const RoomORM = require('../ORM/model/Room');
const sequelize = require("../ORM/sequelize");
const {Sequelize} = require("sequelize");


/**
 * @swagger
 * components:
 *   responses:
 *      CustomersOfCourseFound:
 *          description: send back array of customer for a course
 *          content:
 *              application/json:
 *                  schema:
 *                       $ref: '#/components/schemas/ArrayOfCustomers'
 *      InvalidCourseId:
 *          description: The course id should be a number
 *      CourseNotFound:
 *          description: The course doesn't exist
 *      NoCustomerFound:
 *          description: The course doesn't have customer
 */
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
                throw new Error("Course not found");
            }
            const customersInCourse = await CustomerCourseORM.findAll({where: {id_course: id}});
            if(customersInCourse !== null){
                const customers = [];
                for (const customerInCourse of customersInCourse) {
                    const customerDB = await CustomerORM.findOne({where: {email: customerInCourse.email_customer}});
                    const {last_name, first_name, email} = customerDB;
                    const customer = {
                        last_name,
                        first_name,
                        email
                    }
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
        if(error.message === "Course not found"){
            res.status(404).send("The Course with this id not found");
        } else {
            res.sendStatus(500);
        }
    }
}

 /**
 * @swagger
 * components:
 *   responses:
 *      CoursesOfCustomerFound:
 *          description: send back array of courses for a customer
 *          content:
 *              application/json:
 *                  schema:
 *                       $ref: '#/components/schemas/ArrayOfCourses'
 *      CustomerNotFound:
 *          description: The customer doesn't exist
 *      NoCourseFoundForCustomer:
 *          description: No course found for this customer
*/
module.exports.getCoursesOfCustomer = async (req, res) => {
    const email = req.params.email;
    try{
        const customerDB = await CustomerORM.findOne({where: {email: email}});
        if(customerDB === null){
            throw new Error("Customer not found");
        }
        const coursesOfCustomer = await CustomerCourseORM.findAll({where: {email_customer: email}});
        if(coursesOfCustomer !== null){
            const courses = [];
            for (const courseOfCustomer of coursesOfCustomer) {
                const courseDB = await CourseORM.findOne({where: {id: courseOfCustomer.id_course}});
                const {id, id_sport_hall, id_room, starting_date_time, ending_date_time, level, activity, instructor} = courseDB;
                const sportHall = await SportHallORM.findOne({where: {id: id_sport_hall}});
                const {name} = sportHall;
                const room = await RoomORM.findOne({where: {id_room: id_room, id_sport_hall: id_sport_hall}});
                const {max_capacity} = room;
                const instructorDB = await CustomerORM.findOne({where: {email: instructor}});
                const {last_name, first_name, email} = instructorDB;
                const course = {
                    id: id,
                    sportHall: name,
                    room: {
                        id_room,
                        max_capacity,
                    },
                    starting_date_time: starting_date_time,
                    ending_date_time: ending_date_time,
                    level: level,
                    activity: activity,
                    instructor: {
                        last_name,
                        first_name,
                        email
                    },
                }
                courses.push({course});
            }
            res.json(courses);
        } else {
            throw new Error("No course found");
        }
    } catch (error){
        console.log(error);
        if(error.message === "Customer not found"){
            res.status(404).send("The customer with this email is not found");
        } else if (error.message === "No course found"){
            res.status(404).send("No course found for this cutomer");
        }
        else {
            res.sendStatus(500);
        }

    }
}

/**
 *@swagger
 *components:
 *  responses:
 *      AddCustomerCourse:
 *          description: The customer course has been added
 *  requestBodies:
 *      CustomerCourseToAdd:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email_customer:
 *                              type: string
 *                          id_course:
 *                              type: integer
 *                      required:
 *                          - email_customer
 *                          - id_course
 *
 */
module.exports.postCustomerCourse = async (req, res) => {
    const {email, course} = req.body;
    try{
        await sequelize.transaction( {
            deferrable:  Sequelize.Deferrable.SET_DEFERRED
        }, async (t) => {
            const customerDB = await CustomerORM.findOne({where: {email: email}});
            if(customerDB === null){
                throw new Error("Customer email not valid");
            }
            const courseDB = await CourseORM.findOne({where: {id: course}});
            if(courseDB === null){
                throw new Error("Course id not valid");
            }
            await CustomerCourseORM.create({
                email_customer: email,
                id_course: course
            }, {transaction: t});
        });
        res.sendStatus(201);
    } catch (error){
        console.log(error);
        if(error.message === "Course id not valid"){
            res.status(404).send( "The course id is not valid");
        }else if(error.message === "Customer email not valid"){
            res.status(404).send("The customer email is not valid");
        } else{
            res.sendStatus(500);
        }
    }
}

/**
 *@swagger
 *components:
 *  responses:
 *      CustomerCourseDeleted:
 *          description: The customer course has been deleted
 */
module.exports.deleteCustomerCourse = async (req, res) => {
    const {email_customer, course} = req.body;
    try{
        await CustomerCourseORM.destroy({where: {email_customer: email_customer, id_course: course}});
        res.sendStatus(204);
    } catch (error){
        console.log(error);
        res.sendStatus(500);
    }
}