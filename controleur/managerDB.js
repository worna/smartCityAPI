const pool = require('../modele/database');
const ManagerDB = require('../modele/managerDB');
const CustomerORM = require('../ORM/model/Customer');
const CityORM = require('../ORM/model/City');
const sequelize = require("../ORM/sequelize");
const {Sequelize} = require("sequelize");



/**
 * @swagger
 *  components:
 *      responses:
 *          ManagerUpdated:
 *              description: The manager has been updated
 *      requestBodies:
 *          ManagerToUpdate:
 *              content:
 *                  application/json:
 *                      schema:
 *                          properties:
 *                              email:
 *                                  type: string
 *                              id:
 *                                  type: integer
 *                              firstname:
 *                                  type: string
 *                              lastname:
 *                                  type: string
 *                              birthdate:
 *                                  type: string
 *                                  format: date
 *                              gender:
 *                                  type: integer
 *                              phonenumber:
 *                                  type: string
 *                              newemail:
 *                                  type: string
 *                              password:
 *                                  type: string
 *                                  format: password
 *                              ismanager:
 *                                  type: integer
 *                              isinstructor:
 *                                  type: integer
 *                              language:
 *                                  type: string
 *                              address:
 *                                  type: string
 *                              city_name:
 *                                  type: string
 *                              zip_code:
 *                                  type: integer
 *                              country:
 *                                  type: string
 *                          required:
 *                              - email
 */
module.exports.updateManager = async (req, res) => {
    const toUpdate = req.body;
    const newData = {};
    let doUpdate = false;
    const managerDB = await CustomerORM.findOne({where: {email: req.body.email, is_manager: 1}});
    if (managerDB === null){
        res.status(404).send("Manager not found");
    }
    if(
        toUpdate.lastname !== undefined ||
        toUpdate.firstname !== undefined ||
        toUpdate.gender !== undefined ||
        toUpdate.birthdate !== undefined ||
        toUpdate.phonenumber !== undefined ||
        toUpdate.newemail !== undefined ||
        toUpdate.password !== undefined ||
        toUpdate.ismanager !== undefined ||
        toUpdate.isinstructor !== undefined ||
        toUpdate.language !== undefined||
        toUpdate.address !== undefined ||
        toUpdate.city_name !== undefined ||
        toUpdate.zip_code !== undefined ||
        toUpdate.country !== undefined
    ){
        doUpdate = true;
    }

    if(doUpdate){
        newData.lastname = toUpdate.lastname;
        newData.firstname = toUpdate.firstname;
        newData.gender = toUpdate.gender;
        newData.birthdate = toUpdate.birthdate;
        newData.phonenumber = toUpdate.phonenumber;
        newData.newemail = toUpdate.newemail;
        newData.password = toUpdate.password;
        newData.ismanager = toUpdate.ismanager;
        newData.isinstructor = toUpdate.isinstructor;
        newData.language = toUpdate.language;
        newData.address = toUpdate.address;
        newData.city_name = toUpdate.city_name;
        newData.zip_code = toUpdate.zip_code;
        newData.country = toUpdate.country;

        const client = await pool.connect();
        try{
            await ManagerDB.updateManager(
                client,
                req.body.email,
                newData.firstname,
                newData.lastname,
                newData.birthdate,
                newData.gender,
                newData.phonenumber,
                newData.newemail,
                newData.password,
                newData.ismanager,
                newData.isinstructor,
                newData.language,
                newData.address,
                newData.city_name,
                newData.zip_code,
                newData.country
            );
            res.sendStatus(204);
        }
        catch (e) {
            console.log(e);
            res.sendStatus(500);
        } finally {
            client.release();
        }
    } else {
        console.log("Parameters are wrong or empty");
        res.sendStatus(400);
    }
};

/**
 * @swagger
 *  components:
 *      responses:
 *          ManagerAdd:
 *              description: The manager has been  added to database
 *      requestBodies:
 *          ManagerToAdd:
 *              content:
 *                  application/json:
 *                      schema:
 *                          properties:
 *                              firstname:
 *                                  type: string
 *                              lastname:
 *                                  type: string
 *                              birthdate:
 *                                  type: string
 *                                  format: date
 *                              gender:
 *                                  type: integer
 *                              phonenumber:
 *                                  type: string
 *                              email:
 *                                  type: string
 *                              password:
 *                                  type: string
 *                                  format: password
 *                              language:
 *                                  type: string
 *                              address:
 *                                  type: string
 *                              city_name:
 *                                  type: string
 *                              zip_code:
 *                                  type: integer
 *                              country:
 *                                  type: string
 *                          required:
 *                              - firstname
 *                              - lastname
 *                              - birthdate
 *                              - gender
 *                              - phonenumber
 *                              - email
 *                              - password
 *                              - language
 *                              - address
 *                              - city_name
 *                              - zip_code
 *                              - country
 */
module.exports.postManager = async (req, res) => {
    console.log(req.body);
    const lastname = req.body.lastname;
    const firstname = req.body.firstname;
    const birthdate = req.body.birthdate;
    const gender = req.body.gender;
    const phonenumber= req.body.phonenumber;
    const email = req.body.email;
    const password = req.body.password;
    const language = req.body.language;
    const address = req.body.address;
    const city_name = req.body.city_name;
    const zip_code = req.body.zip_code;
    const country = req.body.country;

    if(lastname === undefined || firstname === undefined || birthdate === undefined || gender === undefined || phonenumber === undefined || email === undefined || password === undefined || language === undefined || address === undefined || city_name === undefined || zip_code === undefined || country === undefined){
        console.log("Parameters are wrong or empty");
        res.sendStatus(400);
    } else {
        const client = await pool.connect();
        try {
            await sequelize.transaction( {
                deferrable:  Sequelize.Deferrable.SET_DEFERRED
            }, async (t) => {
                const cityDB = await CityORM.findOne({where: {city_name: city_name, zip_code: zip_code, country: country}});
                if(cityDB === null){
                     await CityORM.create({
                        city_name,
                        zip_code,
                        country
                    }, {transaction: t});
                }
            });
            await ManagerDB.postManager(client, lastname, firstname, birthdate, gender, phonenumber, email, password, language, address, city_name, zip_code, country);
            res.sendStatus(201);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        } finally {
            client.release();
        }
    }
};
