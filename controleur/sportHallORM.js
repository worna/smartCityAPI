const SportHallORM = require('../ORM/model/SportHall');
const CustomerORM = require ('../ORM/model/Customer');
const CityORM = require('../ORM/model/City');
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
            const sportHallDB = await SportHallORM.findOne({where: {id: id}});
            if(sportHallDB !== null){
                const {id, name, manager, phone_number, email: email_sh, address, city_name, zip_code, country} = sportHallDB;
                const managerDB = await CustomerORM.findOne({where: {email: manager}});
                const {last_name, first_name, email} = managerDB;
                res.json({
                    id,
                    name,
                    manager: {
                        last_name,
                        first_name,
                        email
                    },
                    phone_number,
                    email_sh,
                    address,
                    city_name,
                    zip_code,
                    country
                });
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

// faire swagger
module.exports.getSportHalls = async (req, res) => {

    try{
        const sportHallsDB = await SportHallORM.findAll();
        if(sportHallsDB !== null){
            const sportHalls = [];
            for (const sportHallDB of sportHallsDB) {
                const {id, name, manager, phone_number, email: email_sh, address, city_name, zip_code, country} = sportHallDB;
                if (manager !== null){
                    console.log(manager);
                    const managerDB = await CustomerORM.findOne({where: {email: manager}});
                    const {last_name, first_name, email} = managerDB;
                    managerObj = {last_name, first_name, email};
                } else {
                    managerObj = null;
                }
                const sportHall = {
                    id,
                    name,
                    manager: "managerObj",
                    phone_number,
                    email_sh,
                    address,
                    city_name,
                    zip_code,
                    country
                };
                sportHalls.push(sportHall);
            }
            res.json(sportHalls);
        } else {
            console.log("No sport hall");
            res.sendStatus(404);
        }
    } catch (error){
        console.log(error);
        res.status(500).send(error);
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
    const {name, manager, phone_number, email, address, city_name, zip_code, country} = body;
    try{
        await sequelize.transaction( {
            deferrable:  Sequelize.Deferrable.SET_DEFERRED
        }, async (t) => {
        const managerDB = await CustomerORM.findOne({where: {email: manager}});
        if (managerDB === null){
                throw new Error("Manager email not valid");
            } else {
                const {is_manager} = managerDB;
                if(is_manager != 1) {
                    CustomerORM.update({is_manager : 1},{where:{email: manager}});
                }
        }
        const cityDB = await CityORM.findOne({where: {city_name: city_name, zip_code: zip_code, country: country}});
        if(cityDB === null){
            city = await CityORM.create({
                city_name,
                zip_code,
                country
            }, {transaction: t});
        } else {
            city = cityDB;
        }

        await SportHallORM.create({
            name,
            manager,
            phone_number,
            email,
            address,
            city_name,
            zip_code,
            country
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
    const {id, name, manager, phone_number, email, address, city_name, zip_code, country} = req.body;
    try{
        await sequelize.transaction( {
            deferrable:  Sequelize.Deferrable.SET_DEFERRED
        }, async (t) => {
        const managerDB = await CustomerORM.findOne({where: {email: manager}});
        if(managerDB === null){
            throw new Error("Manager id not valid");
        }
        const cityDB = await CityORM.findOne({where: {city_name: city_name, zip_code: zip_code, country: country}});
        if(cityDB === null){
            city = await CityORM.create({
                city_name,
                zip_code,
                country
            }, {transaction: t});
        } else {
            city = cityDB;
        }
        await SportHallORM.update({ name, manager, phone_number, email, address, city_name, zip_code, country}, {where: {id}}, {transaction: t});
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

