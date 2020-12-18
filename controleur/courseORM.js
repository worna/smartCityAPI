const CourseORM = require('../ORM/model/Course');
const CustomerORM = require ('../ORM/model/Customer');
const CustomerCourseORM = require ('../ORM/model/CustomerCourse');
const SportHallORM = require ('../ORM/model/SportHall');
const RoomORM = require('../ORM/model/Room');
const sequelize = require("../ORM/sequelize");
const {Op, Sequelize} = require("sequelize");


/**
 * @swagger
 * components:
 *  schemas:
 *      Course:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *              id_sport_hall:
 *                  type: integer
 *              id_room:
 *                  type: integer
 *              starting_date_time:
 *                  type: string
 *                  format: datetime
 *              ending_date_time:
 *                  type: string
 *                  format: datetime
 *              level:
 *                  type: string
 *              activity:
 *                  type: string
 *              instructor:
 *                  type: string
 */
/**
 * @swagger
 * components:
 *  responses:
 *      CourseFound:
 *           description: Course found for this id
 *           content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/Course'
 */
module.exports.getCourse = async (req, res) => {
    const idTexte = req.params.id;
    const id = parseInt(idTexte);
    try{
        if(isNaN(id)){
            console.log("The id is not a number");
            res.sendStatus(400);
        } else {
            const courseDB = await CourseORM.findOne({where: {id: id}});
            if(courseDB !== null){
                const {id, id_sport_hall, id_room, starting_date_time, ending_date_time, level, activity, instructor} = courseDB;
                const sportHall = await SportHallORM.findOne({where: {id: id_sport_hall}});
                const {name} = sportHall;
                const room = await RoomORM.findOne({where: {id_room: id_room, id_sport_hall: id_sport_hall}});
                const {max_capacity} = room;
                if (instructor !== null){
                    const instructorDB = await CustomerORM.findOne({where: {email: instructor}});
                    const {last_name, first_name, email} = instructorDB;
                    instructorObj = {last_name, first_name, email};
                } else {
                    instructorObj = null;
                }
                const course = {
                    id: id,
                    sportHall: {
                        id_sport_hall,
                        name,
                    },
                    room: {
                        id_room,
                        max_capacity,
                    },
                    starting_date_time: starting_date_time.toLocaleString(),
                    ending_date_time: ending_date_time.toLocaleString(),
                    level: level,
                    activity: activity,
                    instructor: instructorObj
                }
                res.json(course);
            } else {
                console.log("Impossible to find the course");
                res.sendStatus(404);
            }
        }
    } catch (error){
        console.log(error);
        res.sendStatus(500);
    }
}

/**
 * @swagger
 * components:
 *  schemas:
 *      ArrayOfCourses:
 *          type: array
 *          items:
 *              $ref: '#/components/schemas/Course'
 */
/**
 * @swagger
 * components:
 *  responses:
 *      CoursesFound:
 *           description: send back array of all courses
 *           content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/ArrayOfCourses'
 */
module.exports.getCourses = async (req, res) => {

    try{
        const coursesDB = await CourseORM.findAll();
        if(coursesDB !== null){
            const courses = [];
            for (const courseDB of coursesDB) {
                const {id, id_sport_hall, id_room, starting_date_time, ending_date_time, level, activity, instructor} = courseDB;
                const sportHall = await SportHallORM.findOne({where: {id: id_sport_hall}});
                const {name} = sportHall;
                const room = await RoomORM.findOne({where: {id_room: id_room, id_sport_hall: id_sport_hall}});
                const {max_capacity} = room;
                if (instructor !== null){
                    const instructorDB = await CustomerORM.findOne({where: {email: instructor}});
                    const {last_name, first_name, email} = instructorDB;
                    instructorObj = {last_name, first_name, email};
                } else {
                    instructorObj = null;
                }

                const course = {
                    id: id,
                    sportHall: {
                        id_sport_hall,
                        name,
                    },
                    room: {
                        id_room,
                        max_capacity,
                    },
                    starting_date_time: starting_date_time.toLocaleString(),
                    ending_date_time: ending_date_time.toLocaleString(),
                    level: level,
                    activity: activity,
                    instructor: instructorObj
                }
                courses.push(course);

            }
            res.json(courses);
        }
    } catch (error){
        console.log(error);
        res.sendStatus(500);
    }
}

/**
 *@swagger
 *components:
 *  responses:
 *      CourseAdd:
 *          description: The course has been added
 *      AlreadyCourse:
 *          description: Already a course at this period
 *      InvalidInstructor:
 *          description: Instructor email not valid
 *      InvalidRoomOrSportHall:
 *          description: Room or sport hall id not valid
 *  requestBodies:
 *      CourseToAdd:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          id_sport_hall:
 *                              type: integer
 *                          id_room:
 *                              type: integer
 *                          starting_date_time:
 *                              type: string
 *                              format: datetime
 *                          ending_date_time:
 *                              type: string
 *                              format: datetime
 *                          level:
 *                              type: string
 *                          activity:
 *                             type: string
 *                          instructor:
 *                              type: string
 *                      required:
 *                          - id_sport_hall
 *                          - id_room
 *                          - starting_date_time
 *                          - ending_date_time
 *                          - level
 *                          - activity
 */
module.exports.postCourse = async (req, res) => {
    const body = req.body;
    const {id_sport_hall, id_room, starting_date_time, ending_date_time, level, activity, instructor} = body;
    try{
        await sequelize.transaction( {
            deferrable:  Sequelize.Deferrable.SET_DEFERRED
        }, async (t) => {
        if(instructor !== undefined){
            const instructorDB = await CustomerORM.findOne({where: {email: instructor}});
            if (instructorDB === null) {
                throw new Error("Instructor email not valid");
            } else {
                const {is_instructor} = instructorDB;
                if (is_instructor != 1) {
                    await CustomerORM.update({is_instructor: 1}, {where: {email: instructor}});
                }
            }
        }
        const roomDB = await RoomORM.findOne({where: {id_room: id_room, id_sport_hall: id_sport_hall}});
        if(roomDB === null){
            throw new Error("Room or sporthall id not valid");
        }
        const currentCourseDB = await CourseORM.findOne(
            {
                where: {
                    id_sport_hall : id_sport_hall,
                    id_room : id_room,
                    [Op.or] : [
                        {
                            [Op.and]: [
                                { starting_date_time:{
                                        [Op.gte]: starting_date_time
                                    }
                                },
                                { starting_date_time:{
                                        [Op.lt]: ending_date_time
                                    }
                                }
                            ]
                        },
                        {
                            [Op.and]: [
                                { starting_date_time:{
                                        [Op.lte]: starting_date_time
                                    }
                                },
                                { ending_date_time:{
                                        [Op.gte]: ending_date_time
                                    }
                                }
                            ]
                        },
                        {
                            [Op.and]: [
                                { ending_date_time:{
                                        [Op.gt]: starting_date_time
                                    }
                                },
                                { ending_date_time:{
                                        [Op.lte]: ending_date_time
                                    }
                                }
                            ]
                        }
                    ]
            }
            });
            if(currentCourseDB !== null){
                throw new Error("Already a course at this period");
            }
        await CourseORM.create({
            id_sport_hall,
            id_room,
            starting_date_time,
            ending_date_time,
            level,
            activity,
            instructor,
        }, {transaction: t});
        });
        res.sendStatus(201);
    } catch (error){
        console.log(error);
        if(error.message === "Room or sporthall id not valid"){
            res.status(404).send("The room or the sporthall id is not valid");
        } else if(error.message === "Instructor id not valid"){
            res.status(404).send("The instructor id is not valid");
        } else if (error.message === "Already a course at this period"){
            res.status(404).send("You can't add a course at this moment because there is an other one");
        } else{
            res.sendStatus(500);
        }
    }
}

/**
 *@swagger
 *components:
 *  responses:
 *      CourseUpdated:
 *          description: The course has been updated
 *  requestBodies:
 *      CourseToUpdate:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          id:
 *                              type: integer
 *                          id_sport_hall:
 *                              type: integer
 *                          id_room:
 *                              type: integer
 *                          starting_date_time:
 *                              type: string
 *                              format: datetime
 *                          ending_date_time:
 *                              type: string
 *                              format: datetime
 *                          level:
 *                              type: string
 *                          activity:
 *                             type: string
 *                          instructor:
 *                              type: string
 *                      required:
 *                          - id
 *                          - id_sport_hall
 *                          - id_room
 *                          - starting_date_time
 *                          - ending_date_time
 *                          - level
 *                          - activity
 */
module.exports.updateCourse = async (req, res) => {
    const {id, id_sport_hall, starting_date_time, ending_date_time, level, activity, room, instructor} = req.body;
    try{
        await sequelize.transaction( {
            deferrable:  Sequelize.Deferrable.SET_DEFERRED
        }, async (t) => {
        const sportHallDB = await SportHallORM.findOne({where: {id: id_sport_hall}});
        if(sportHallDB === null){
            throw new Error("Sport hall id not valid");
        }
        if(instructor !== undefined){
            const instructorDB = await CustomerORM.findOne({where: {email: instructor}});
            if (instructorDB === null) {
                throw new Error("Instructor email not valid");
            } else {
                const {is_instructor} = instructorDB;
                if (is_instructor != 1) {
                    await CustomerORM.update({is_instructor: 1}, {where: {email: instructor}});
                }
            }
        }
        await CourseORM.update({id_sport_hall, starting_date_time, ending_date_time, level, activity, room, instructor}, {where: {id}}, {transaction: t});
        });
        res.sendStatus(204);
    } catch (error){
        console.log(error);
        if (error.message === "Sport hall id not valid"){
             res.status(404).send("The sport hall id is not valid");
        } else if (error.message === "Instructor email not valid"){
             res.status(404).send("The instructor email is not valid");
        } else {
            res.sendStatus(500);
        }
    }
}

/**
 *@swagger
 *components:
 *  responses:
 *      CourseDeleted:
 *          description: The course has been deleted
 */
module.exports.deleteCourse = async (req, res) => {
    const {id} = req.body;
    try{
        sequelize.transaction( {
            deferrable:  Sequelize.Deferrable.SET_DEFERRED
        }, async (t) => {
            await CustomerCourseORM.destroy({where: {id_course : id}}, {transaction: t});
            await CourseORM.destroy({where: {id}}, {transaction: t});
            res.sendStatus(204);
        });
    } catch (error){
        console.log(error);
        res.status(500).send(error.message);
    }
}

