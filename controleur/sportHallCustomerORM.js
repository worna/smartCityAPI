const CustomerORM = require("../ORM/model/Customer");
const SportHallCustomerORM = require("../ORM/model/SportHallCustomer");
const SportHallORM = require("../ORM/model/SportHall");
const sequelize = require("../ORM/sequelize");
const {Sequelize} = require("sequelize");
/**
 * @swagger
 * components:
 *  responses:
 *      AddedCustomerToSportHall:
 *          description: The customer has been added to the sport hall
 *      SportHallDoesNotExist:
 *          description: The sport hall doesn't exist
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          error:
 *                              type: string
 *      CustomerDoesNotExist:
 *          description: The customer doesn't exist
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          error:
 *                              type: string
 *
 *  requestBodies:
 *      AddCustomerToSportHall:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          sportHall:
 *                              type: object
 *                              properties:
 *                                  id:
 *                                      type: integer
 *                              required:
 *                                  - id
 *                          customer:
 *                              type: object
 *                              properties:
 *                                  id:
 *                                      type: integer
 *                              required:
 *                                  - id
 *                      required:
 *                          - sportHall
 *                          - customer
 */
module.exports.postSportHallCustomer = async (req, res) => {
    const {sportHall, customer} = req.body;
    try{
        await sequelize.transaction( {
            deferrable:  Sequelize.Deferrable.SET_DEFERRED
        }, async (t) => {
            const sportHallDB = await SportHallORM.findOne({where: {id: sportHall}});
            if(sportHallDB === null){
                throw new Error("Sport hall id not valid");
            }
            const customerDB = await CustomerORM.findOne({where: {id: customer}});
            if(customerDB === null){
                throw new Error("Customer id not valid");
            }
            await SportHallCustomerORM.create({
                id_sport_hall: sportHall,
                id_customer: customer
            }, {transaction: t});
        });
        res.sendStatus(201);
    } catch (error){
        console.log(error);
        if(error.message === "Sport hall id not valid"){
            res.status(404).send( "The sport hall id is not valid");
        }else if(error.message === "Customer id not valid"){
            res.status(404).send("The customer id is not valid");
        } else{
            res.sendStatus(500);
        }
    }
}
module.exports.getSportHallCustomers = async (req, res) => {
    const idTexte = req.params.id;
    const id = parseInt(idTexte);
    try{
        if(isNaN(id)){
            console.log("The id is not a number");
            res.sendStatus(400);
        } else {
            const sportHallDB = await SportHallORM.findOne({where: {id: id}});
            if(sportHallDB === null){
                throw new Error("Sport hall id not valid");
            }
            const sportHallCustomers = await SportHallCustomerORM.findAll({where: {id_sport_hall: id}});
            if(sportHallCustomers !== null){
                const customers = [];
                for (const sportHallcustomer of sportHallCustomers) {
                    const customer = await CustomerORM.findOne({where: {id: sportHallcustomer.id_customer}});
                    customers.push({customer});
                }
                res.json(customers);
            } else {
                console.log("No customers for this hall");
                res.sendStatus(404);
            }
        }
    } catch (error){
        console.log(error);
        res.sendStatus(500);
    }
}