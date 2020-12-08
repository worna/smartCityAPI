const SportHallORM = require('../ORM/model/SportHall');
const CustomerORM = require ('../ORM/model/Customer');
const sequelize = require("../ORM/sequelize");
const {Sequelize} = require("sequelize");

/**
 * @swagger
 * components:
 *  schemas:
 *      SportHall:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *              name:
 *                  type: string
 *                  description: sport hall's name
 *              manager:
 *                  type: integer
 *              phonenumber:
 *                  type: string
 *              email:
 *                  type: string
 */
 /**
 * @swagger
 * components:
 *  responses:
 *      SportHallFound:
 *           description: send a sport hall
 *           content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/SportHall'
 */
module.exports.getSportHall = async (req, res) => {
    const idTexte = req.params.id;
    const id = parseInt(idTexte);
    try{
        if(isNaN(id)){
            console.log("The id is not a number");
            res.sendStatus(400);
        } else {
            const sportHall = await SportHallORM.findOne({where: {id: id}});
            if(sportHall !== null){
                res.json(sportHall);
            } else {
                console.log("Impossible to find the sport hall");
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
 *      AddSportHall:
 *          description: The sport hall has been added
 *  requestBodies:
 *      SportHallToAdd:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              description: sportHall's name
 *                          manager:
 *                              type: integer
 *                          phonenumber:
 *                              type: string
 *                          email:
 *                              type: string
 */

module.exports.postSportHall = async (req, res) => {
    const body = req.body;
    const {name, manager, phone_number, email} = body;
    try{
        await sequelize.transaction( {
            deferrable:  Sequelize.Deferrable.SET_DEFERRED
        }, async (t) => {
        const managerDB = await CustomerORM.findOne({where: {id: manager}});
        if(managerDB === null){
            throw new Error("Manager id not valid");
        }
        await SportHallORM.create({
            name,
            manager,
            phone_number,
            email,
        }, {transaction: t});

        });
        res.sendStatus(201);
    } catch (error){
        console.log(error);
        if(error.message === "Manager id not valid"){
            res.status(404).send("The manager id is not valid");
        }else{
            res.sendStatus(500);
        }
    }
}

/**
 *@swagger
 *components:
 *  responses:
 *      SportHallUpdated:
 *          description: The sport hall has been updated
 *  requestBodies:
 *      SportHallToUpdate:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          id:
 *                              type: integer
 *                          name:
 *                              type: string
 *                              description: sportHall's name
 *                          manager:
 *                              type: integer
 *                          phonenumber:
 *                              type: string
 *                          email:
 *                              type: string
 */
module.exports.updateSportHall = async (req, res) => {
    const {id, name, manager, phone_number, email,} = req.body;
    try{
        await sequelize.transaction( {
            deferrable:  Sequelize.Deferrable.SET_DEFERRED
        }, async (t) => {
        const managerDB = await CustomerORM.findOne({where: {id: manager}});
        if(managerDB === null){
            throw new Error("Manager id not valid");
        }
        await SportHallORM.update({ name, manager, phone_number, email}, {where: {id}}, {transaction: t});
        });
        res.sendStatus(204);
    } catch (error){
        console.log(error);
        if(error.message === "Manager id not valid"){
            res.status(404).send("The manager id is not valid");
        }else{
            res.sendStatus(500);
        }
    }
}

/**
 *@swagger
 *components:
 *  responses:
 *      SportHallDeleted:
 *          description: The sport hall has been deleted
 */
module.exports.deleteSportHall = async (req, res) => {
    const {id} = req.body;
    try{
        await SportHallORM.destroy({where: {id}});
        res.sendStatus(204);
    } catch (error){
        console.log(error);
        res.sendStatus(500);
    }
}

