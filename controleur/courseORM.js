const CourseORM = require('../ORM/model/Course');
const CustomerORM = require ('../ORM/model/Customer');
const SportHallORM = require ('../ORM/model/SportHall');
const sequelize = require("../ORM/sequelize");
const {Sequelize} = require("sequelize");


module.exports.getCourse = async (req, res) => {
    const idTexte = req.params.id;
    const id = parseInt(idTexte);
    try{
        if(isNaN(id)){
            res.sendStatus(400);
        } else {
            const course = await CourseORM.findOne({where: {id: id}});
            if(course !== null){
                res.json(course);
            } else {
                res.sendStatus(404);
            }
        }
    } catch (error){
        console.log(error);
        res.status(500).send(error.message);
    }
}

module.exports.postCourse = async (req, res) => {
    const body = req.body;
    const {id_sport_hall, starting_date_time, ending_date_time, level, activity, room, id_instructor} = body;
    try{
        await sequelize.transaction( {
            deferrable:  Sequelize.Deferrable.SET_DEFERRED
        }, async (t) => {
        const sportHallDB = await SportHallORM.findOne({where: {id: id_sport_hall}});
        if(sportHallDB === null){
            throw new Error("Sport hall id not valid");
        }
        const customerDB = await CustomerORM.findOne({where: {id: id_instructor}});
        if(customerDB === null){
            throw new Error("Instructor id not valid");
        }
        await CourseORM.create({
            id_sport_hall,
            starting_date_time,
            ending_date_time,
            level,
            activity,
            room,
            id_instructor,
        }, {transaction: t});
        });
        res.sendStatus(201);
    } catch (error){
        console.log(error);
        if(error.message === "Sport hall id not valid"){
            res.status(404).send("The sport hall id is not valid");
        }else if(error.message === "Instructor id not valid"){
            res.status(404).send("The instructor id is not valid");
        } else{
            console.log(error);
            res.sendStatus(500);
        }
    }
}

module.exports.updateCourse = async (req, res) => {
    const {id, id_sport_hall, starting_date_time, ending_date_time, level, activity, room, id_instructor} = req.body;
    try{
        await sequelize.transaction( {
            deferrable:  Sequelize.Deferrable.SET_DEFERRED
        }, async (t) => {
        const sportHallDB = await SportHallORM.findOne({where: {id: id_sport_hall}});
        if(sportHallDB === null){
            throw new Error("Sport hall id not valid");
        }
        const customerDB = await CustomerORM.findOne({where: {id: id_instructor}});
        if(customerDB === null){
            throw new Error("Instructor id not valid");
        }
        await CourseORM.update({id_sport_hall, starting_date_time, ending_date_time, level, activity, room, id_instructor}, {where: {id}}, {transaction: t});
        });
        res.sendStatus(204);
    } catch (error){
         if(error.message === "Sport hall id not valid"){
             res.status(404).send("The sport hall id is not valid");
        }else if(error.message === "Instructor id not valid"){
             res.status(404).send("The instructor id is not valid");
        } else{
            console.log(error);
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

