const RoomORM = require('../ORM/model/Room');
const SportHallORM = require('../ORM/model/SportHall');
const sequelize = require("../ORM/sequelize");
const {Sequelize} = require("sequelize");


/**
 * @swagger
 * components:
 *  schemas:
 *      Room:
 *          type: object
 *          properties:
 *              id_room:
 *                  type: integer
 *              id_sport_hall:
 *                  type: integer
 *              max_capacity:
 *                  type: integer
 *          required:
 *              - id_room
 *              - id_sport_hall
 */
/**
 * @swagger
 * components:
 *  responses:
 *      RoomFound:
 *           description: send back a room
 *           content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/Room'
 */
module.exports.getRoom = async (req, res) => {
    const idTexte = req.params.id;
    const id = idTexte.split('-');
    const id_sport_hall = id[0];
    const id_room = id[1];

    try{
        if(isNaN(id_room) || isNaN(id_sport_hall)){
            console.log("The id is not a number");
            res.sendStatus(400);
        } else {
            const roomDB = await RoomORM.findOne({where: {id_room: id_room, id_sport_hall: id_sport_hall}});
            if(roomDB !== null){
                const {max_capacity} = roomDB;
                const sportHall = await SportHallORM.findOne({where: {id: id_sport_hall}});
                const {name} = sportHall;
                const room = {
                    id: id_room,
                    sportHall: {
                        id_sport_hall,
                        name
                    },
                    max_capacity
                }
                res.json(room);
            } else {
                console.log("Impossible to find the room");
                res.sendStatus(404);
            }
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
 *      AddRoom:
 *          description: The room has been added
 *      SportHallNotFound:
 *          description: The sport hall is not found
 *  requestBodies:
 *      RoomToAdd:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          id_room:
 *                              type: integer
 *                          id_sport_hall:
 *                              type: integer
 *                          max_capacity:
 *                              type: integer
 *                      required:
 *                          - id_room
 *                          - id_sport_hall
 */
module.exports.postRoom = async (req, res) => {
    const body = req.body;
        const {id_room, id_sport_hall, max_capacity} = body;
    try{
        await sequelize.transaction( {
            deferrable:  Sequelize.Deferrable.SET_DEFERRED
        }, async (t) => {
            const sportHallDB = await SportHallORM.findOne({where: {id: id_sport_hall}});
            if(sportHallDB === null){
                throw new Error("Sport hall not found");
            }

            await RoomORM.create({
                id_room,
                id_sport_hall,
                max_capacity,
            }, {transaction: t});
        });
        res.sendStatus(201);
    } catch (error){
        console.log(error);
        if (error.message === "Sport hall not found") {
            res.status(404).send("The sport hall is not found");
        } else {
            res.sendStatus(500);
        }
    }
}

/**
 *@swagger
 *components:
 *  responses:
 *      RoomUpdated:
 *          description: The room has been updated
 *  requestBodies:
 *      RoomToUpdate:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          id_room:
 *                              type: integer
 *                          id_sport_hall:
 *                              type: integer
 *                          max_capacity:
 *                              type: integer
 *                      required:
 *                          - id_room
 *                          - id_sport_hall
 */
module.exports.updateRoom = async (req, res) => {
    const {id_room, id_sport_hall, max_capacity} = req.body;
    try{
        await sequelize.transaction( {
            deferrable:  Sequelize.Deferrable.SET_DEFERRED
        }, async (t) => {
            const sportHallDB = await SportHallORM.findOne({where: {id: id_sport_hall}});
            if(sportHallDB === null){
                throw new Error("Sport hall not found");
            }

            await RoomORM.update({id_room, id_sport_hall, max_capacity}, {where: {id_room: id_room, id_sport_hall: id_sport_hall}}, {transaction: t});
        });
        res.sendStatus(204);
    } catch (error){
        console.log(error);
        if (error.message === "Sport hall not found") {
            res.status(404).send("The sport hall is not found");
        } else {
            res.sendStatus(500);
        }
    }
}

/**
 *@swagger
 *components:
 *  responses:
 *      RoomDeleted:
 *          description: The room has been deleted
 */
module.exports.deleteRoom = async (req, res) => {
    const {id_room, id_sport_hall} = req.body;
    try{
        await RoomORM.destroy({where: {id_room: id_room, id_sport_hall: id_sport_hall}});
        res.sendStatus(204);
    } catch (error){
        console.log(error);
        res.status(500).send(error.message);
    }
}

