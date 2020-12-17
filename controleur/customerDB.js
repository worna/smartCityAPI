const pool = require('../modele/database');
const CustomerDB = require('../modele/customerDB');
const CustomerORM = require('../ORM/model/Customer');
const CityORM = require('../ORM/model/City');
const CustomerCourseORM = require('../ORM/model/CustomerCourse');
const SportHallCustomerORM = require('../ORM/model/SportHallCustomer');
const CourseORM = require('../ORM/model/Course');
const sequelize = require("../ORM/sequelize");
const {Sequelize} = require("sequelize");

/**
 * @swagger
 * components:
 *  schemas:
 *      Customer:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *              first_name:
 *                  type: string
 *              last_name:
 *                  type: string
 *              birth_date:
 *                  type: string
 *                  format: datetime
 *              gender:
 *                  type: integer
 *              phone_number:
 *                  type: string
 *              email:
 *                  type: string
 *              is_instructor:
 *                  type: integer
 *              is_manager:
 *                  type: integer
 *              language:
 *                  type: string
 *              address:
 *                  type: string
 *              city_name:
 *                  type: string
 *              zip_code:
 *                  type: integer
 *              country:
 *                  type: string
 */
/**
 * @swagger
 * components:
 *  schemas:
 *      ArrayOfCustomers:
 *          type: array
 *          items:
 *              $ref: '#/components/schemas/Customer'
 */
/**
 * @swagger
 * components:
 *  responses:
 *      CustomersFound:
 *           description: send an array of all customers
 *           content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/ArrayOfCustomers'
 */
module.exports.getAllCustomers = async (req, res) => {
    try{
        const allCustomers = await CustomerORM.findAll();
        const customers = [];
        for (const customerDB of allCustomers) {
            const customer = {
                id: customerDB.id,
                first_name : customerDB.first_name,
                last_name : customerDB.last_name,
                birth_date : customerDB.birth_date,
                gender : customerDB.gender,
                phone_number : customerDB.phone_number,
                email : customerDB.email,
                inscription_date : customerDB.inscription_date,
                is_manager : customerDB.is_manager,
                is_instructor : customerDB.is_instructor,
                language : customerDB.language,
                address : customerDB.address,
                city_name : customerDB.city_name,
                zip_code : customerDB.zip_code,
                country : customerDB.country
            }
            customers.push({customer});
        }
        res.json(customers);
    } catch (error){
        console.log(error);
        res.sendStatus(500);
    }
};

/**
 * @swagger
 *  components:
 *      responses:
 *          CustomerAdd:
 *              description: The customer has been  added to database
 *          IncorrectCustomerBody:
 *              description: At least one parameter in body is wrong or empty
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
    const lastname = req.body.last_name;
    const firstname = req.body.first_name;
    const birthdate = req.body.birth_date;
    const gender = req.body.gender;
    const phonenumber= req.body.phone_number;
    const email = req.body.email;
    const password = req.body.password;
    const isinstructor = req.body.is_instructor;
    const language = req.body.language;
    const address = req.body.address;
    const city_name = req.body.city_name;
    const zip_code = req.body.zip_code;
    const country = req.body.country;

    if(lastname === undefined || firstname === undefined || birthdate === undefined || gender === undefined || phonenumber === undefined || email === undefined || password === undefined || isinstructor === undefined || language === undefined || address === undefined || city_name === undefined || zip_code === undefined || country === undefined){
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
            await CustomerDB.createCustomer(client, lastname, firstname, birthdate, gender, phonenumber, email, password, isinstructor, language, address, city_name, zip_code, country);
            res.sendStatus(201);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        } finally {
            client.release();
        }
    }
};

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
 *                              email:
 *                                  type: string
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
 *                              - email
 */
module.exports.updateCustomer = async (req, res) => {
    const toUpdate = req.body;
    const newData = {};
    let doUpdate = false;
    const customerDB = await CustomerORM.findOne({where: {email: req.body.email}});
    if (customerDB === null){
        throw new Error("Customer not found");
    }
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
            if(error.message === "Customer not found"){
                res.status(404).send("The customer is not found");
            } else {
                res.sendStatus(500);
            }
        } finally {
            client.release();
        }
    } else {
        console.log("Parameters are wrong or empty");
        res.sendStatus(400);
    }
};

/**
 *@swagger
 *components:
 *  responses:
 *      CustomerDeleted:
 *          description: The customer has been deleted
 */
module.exports.deleteCustomer = async (req, res) => {
    const {email} = req.body;
    try{
        sequelize.transaction( {
            deferrable:  Sequelize.Deferrable.SET_DEFERRED
        }, async (t) => {
            await CustomerCourseORM.destroy({where: {email_customer : email}}, {transaction: t});
            await SportHallCustomerORM.destroy({where: {email_customer: email}}, {transaction: t});
            await CustomerORM.destroy({where: {email}}, {transaction: t});
            res.sendStatus(204);
        });
    } catch (error){
        console.log(error);
        res.status(500).send(error.message);
    }
}