const pool = require('../modele/database');
const CustomerDB = require('../modele/customerDB');
const CityORM = require('../ORM/model/City');
const sequelize = require("../ORM/sequelize");
const {Sequelize} = require("sequelize");


/**
 * @swagger
 *  components:
 *      responses:
 *          CustomerUpdated:
 *              description: The customer has been updated
 *      requestBodies:
 *          CustomerToUpdate:
 *              content:
 *                  application/json:
 *                      schema:
 *                          properties:
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
 *                              email:
 *                                  type: string
 *                              password:
 *                                  type: string
 *                                  format: password
 *                              inscriptiondate:
 *                                  type: string
 *                                  format: date
 *                              ismanager:
 *                                  type: integer
 *                              isinstructor:
 *                                  type: integer
 *                              language:
 *                                  type: string
 */
module.exports.updateCustomer = async (req, res) => {
    if(req.session){
        const toUpdate = req.body;
        const newData = {};
        let doUpdate = false;

        if(
            toUpdate.lastname !== undefined ||
            toUpdate.firstname !== undefined ||
            toUpdate.gender !== undefined ||
            toUpdate.birthdate !== undefined ||
            toUpdate.phonenumber !== undefined ||
            toUpdate.newemail !== undefined ||
            toUpdate.password !== undefined ||
            toUpdate.inscriptiondate !== undefined ||
            toUpdate.ismanager !== undefined ||
            toUpdate.isinstructor !== undefined ||
            toUpdate.language !== undefined ||
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
            newData.inscriptiondate = toUpdate.inscriptiondate;
            newData.ismanager = toUpdate.ismanager;
            newData.isinstructor = toUpdate.isinstructor;
            newData.language = toUpdate.language;
            newData.address = toUpdate.address;
            newData.city_name = toUpdate.city_name;
            newData.zip_code = toUpdate.zip_code;
            newData.country = toUpdate.country;

            const client = await pool.connect();
            try{
                await CustomerDB.updateCustomer(
                    client,
                    req.body.email,
                    newData.firstname,
                    newData.lastname,
                    newData.birthdate,
                    newData.gender,
                    newData.phonenumber,
                    newData.newemail,
                    newData.password,
                    newData.inscriptiondate,
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
            catch (error) {
                console.log(error);
                res.sendStatus(500);
            } finally {
                client.release();
            }
        } else {
            console.log("Parameters are wrong or empty");
            res.sendStatus(400);
        }

    } else {
        console.log("You are not connected!");
        res.sendStatus(401);
    }
};

/**
 * @swagger
 *  components:
 *      responses:
 *          CustomerAdd:
 *              description: The customer has been  added to database
 *      requestBodies:
 *          CustomerToAdd:
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
 *                              inscriptiondate:
 *                                  type: string
 *                                  format: date
 *                              ismanager:
 *                                  type: integer
 *                              isinstructor:
 *                                  type: integer
 *                              language:
 *                                  type: string
 *                          required:
 *                              - firstname
 *                              - lastname
 *                              - birthdate
 *                              - gender
 *                              - phonenumber
 *                              - email
 *                              - password
 *                              - inscriptiondate
 *                              - ismanager
 *                              - isinstructor
 *                              - language
 */
module.exports.postCustomer = async (req, res) => {
    const lastname = req.body.lastname;
    const firstname = req.body.firstname;
    const birthdate = req.body.birthdate;
    const gender = req.body.gender;
    const phonenumber= req.body.phonenumber;
    const email = req.body.email;
    const password = req.body.password;
    const inscriptiondate = req.body.inscriptiondate;
    const isinstructor = req.body.isinstructor;
    const language = req.body.language;
    const address = req.body.address;
    const city_name = req.body.city_name;
    const zip_code = req.body.zip_code;
    const country = req.body.country;

    if(lastname === undefined || firstname === undefined || birthdate === undefined || gender === undefined || phonenumber === undefined || email === undefined || password === undefined || inscriptiondate === undefined || isinstructor === undefined || language === undefined || address === undefined || city_name === undefined || zip_code === undefined || country === undefined){
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
                city = await CityORM.create({
                    city_name,
                    zip_code,
                    country
                }, {transaction: t});
            } else {
                city = cityDB;
            }
            });
            await CustomerDB.createCustomer(client, lastname, firstname, birthdate, gender, phonenumber, email, password, inscriptiondate, isinstructor, language, address, city_name, zip_code, country);
            res.sendStatus(201);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        } finally {
            client.release();
        }
    }
};
