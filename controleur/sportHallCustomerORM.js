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

// faire swagger
module.exports.getCustomersInSportHall = async (req, res) => {
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
            const customersInSportHall = await SportHallCustomerORM.findAll({where: {id_sport_hall: id}});
            if(customersInSportHall !== null){
                const customers = [];
                for (const customerInSportHall of customersInSportHall) {
                    const customerDB = await CustomerORM.findOne({where: {id: customerInSportHall.id_customer}});
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
                console.log("No customers for this hall");
                res.sendStatus(404);
            }
        }
    } catch (error){
        console.log(error);
        res.sendStatus(500);
    }
}

// faire swagger
module.exports.getSportHallsOfCustomer = async (req, res) => {
    const email = req.params.email;
    try {
        const customerDB = await CustomerORM.findOne({where: {email: email}});
        if (customerDB === null) {
            throw new Error("Customer email not valid");
        }
        const {id} = customerDB;
        const sportHallsOfCustomer = await SportHallCustomerORM.findAll({where: {id_customer: id}});
        if (sportHallsOfCustomer !== null) {
            const sportHalls = [];
            for (const sportHallOfCustomer of sportHallsOfCustomer) {
                const sportHallDB = await SportHallORM.findOne({where: {id: sportHallOfCustomer.id_sport_hall}});
                const {name} = sportHallDB;
                sportHalls.push({name});
            }
            res.json(sportHalls);
        } else {
            console.log("No sport hall for this customer");
            res.sendStatus(404);
        }

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

/**
 *@swagger
 *components:
 *  responses:
 *      SportHallCustomerDeleted:
 *          description: The sporthall customer has been deleted
 */
module.exports.deleteSportHallCustomer = async (req, res) => {
    const {sportHall, customer} = req.body;
    try{
        await SportHallCustomerORM.destroy({where: {id_sport_hall: sportHall, id_customer: customer}});
        res.sendStatus(204);
    } catch (error){
        console.log(error);
        res.sendStatus(500);
    }
}