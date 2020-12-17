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
 *      SportHallCustomerToAdd:
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
                throw new Error("Sport not found");
            }
            const customerDB = await CustomerORM.findOne({where: {email: customer}});
            if(customerDB === null){
                throw new Error("Customer not found");
            }
            await SportHallCustomerORM.create({
                id_sport_hall: sportHall,
                email_customer: customer
            }, {transaction: t});
        });
        res.sendStatus(201);
    } catch (error){
        console.log(error);
        if(error.message === "Sport hall not found"){
            res.status(404).send( "The sport hall with this id is not found");
        }else if(error.message === "Customer not found"){
            res.status(404).send("The customer with this email is not found");
        } else{
            res.sendStatus(500);
        }
    }
}

/**
 * @swagger
 * components:
 *   responses:
 *      CustomersOfSportHallFound:
 *          description: send back array of customer for a sport hall
 *          content:
 *              application/json:
 *                  schema:
 *                       $ref: '#/components/schemas/ArrayOfCustomers'
 *      InvalidSportHallId:
 *          description: The sport hall id should be a number
 *      SportHallNotFound:
 *          description: The sport hall doesn't exist
 *      NoCustomerFound:
 *          description: The sport hall doesn't have customer
 */
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
                    const customerDB = await CustomerORM.findOne({where: {email: customerInSportHall.email_customer}});
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

/**
 * @swagger
 * components:
 *   responses:
 *      SportHallsOfCustomerFound:
 *          description: send back array of sport halls for a customer
 *          content:
 *              application/json:
 *                  schema:
 *                       $ref: '#/components/schemas/ArrayOfSportHalls'
 *      CustomerNotFound:
 *          description: The customer doesn't exist
 *      NoSportHallFoundForCustomer:
 *          description: No sport hall found for this customer
 */
module.exports.getSportHallsOfCustomer = async (req, res) => {
    const emailCustomer = req.params.email;
    try {
        const customerDB = await CustomerORM.findOne({where: {email: emailCustomer}});
        if (customerDB === null) {
            throw new Error("Customer email not valid");
        }
        const {email} = customerDB;
        const sportHallsOfCustomer = await SportHallCustomerORM.findAll({where: {email_customer: email}});
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
        await SportHallCustomerORM.destroy({where: {id_sport_hall: sportHall, email_customer: customer}});
        res.sendStatus(204);
    } catch (error){
        console.log(error);
        res.sendStatus(500);
    }
}