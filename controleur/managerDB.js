const pool = require('../modele/database');
const ManagerDB = require('../modele/managerDB');


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
module.exports.updateManager = async (req, res) => {
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
        toUpdate.language !== undefined
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
                newData.inscriptiondate,
                newData.ismanager,
                newData.isinstructor,
                newData.language
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
module.exports.postManager = async (req, res) => {
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

    if(lastname === undefined || firstname === undefined || birthdate === undefined || gender === undefined || phonenumber === undefined || email === undefined || password === undefined || inscriptiondate === undefined  || isinstructor === undefined || language === undefined){
        console.log("Parameters are wrong or empty");
        res.sendStatus(400);
    } else {
        const client = await pool.connect();
        try {
            await ManagerDB.postManager(client, lastname, firstname, birthdate, gender, phonenumber, email, password, inscriptiondate, isinstructor, language);
            res.sendStatus(201);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        } finally {
            client.release();
        }
    }
};
