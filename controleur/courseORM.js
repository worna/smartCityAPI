const CourseORM = require('../ORM/model/Course');
const CustomerORM = require ('../ORM/model/Customer');
const SportHallORM = require ('../ORM/model/SportHall');
const RoomORM = require('../ORM/model/Room');
const sequelize = require("../ORM/sequelize");
const {Op, Sequelize} = require("sequelize");


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

module.exports.postCourse = async (req, res) => {
    const body = req.body;
    const {id_sport_hall, id_room, starting_date_time, ending_date_time, level, activity, instructor} = body;
    try{
        await sequelize.transaction( {
            deferrable:  Sequelize.Deferrable.SET_DEFERRED
        }, async (t) => {
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
            if(currentCourseDB === null){
                throw new Error("Already a course at this period");
            }
        const customerDB = await CustomerORM.findOne({where: {email: instructor}});
        if(customerDB === null){
            throw new Error("Instructor id not valid");
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
        const customerDB = await CustomerORM.findOne({where: {email: instructor}});
        if(customerDB === null){
            throw new Error("Instructor id not valid");
        }
        await CourseORM.update({id_sport_hall, starting_date_time, ending_date_time, level, activity, room, instructor}, {where: {id}}, {transaction: t});
        });
        res.sendStatus(204);
    } catch (error){
        console.log(error);
        if (error.message === "Sport hall id not valid"){
             res.status(404).send("The sport hall id is not valid");
        } else if (error.message === "Instructor id not valid"){
             res.status(404).send("The instructor id is not valid");
        } else {
            res.sendStatus(500);
        }
    }
}

module.exports.deleteCourse = async (req, res) => {
    const {id} = req.body;
    try{
        await CourseORM.destroy({where: {id}});
        res.sendStatus(204);
    } catch (error){
        console.log(error);
        res.status(500).send(error.message);
    }
}

