require("dotenv").config();
const pool = require('../modele/database');
const AdminModele = require("../modele/adminDB");


/**
 * @swagger
 *  components:
 *      responses:
 *          AdminAdd:
 *              description: The admin has been  added to database
 *      requestBodies:
 *          AdminToAdd:
 *              content:
 *                  application/json:
 *                      schema:
 *                          properties:
 *                              email:
 *                                  type: string
 *                              password:
 *                                  type: string
 *                                  format: password
 *                          required:
 *                              - email
 *                              - password
 */
module.exports.postAdmin = async (req, res) => {
    const {email, password} = req.body;
    if(email === undefined || password === undefined){
        console.log("email or password is empty")
        res.sendStatus(400);
    } else {
        const client = await pool.connect();
        try{
            await AdminModele.postAdmin(email, password, client);
            res.sendStatus(201);
        } catch (error){
            console.log(error);
            res.sendStatus(500);
        } finally {
            client.release();
        }
    }
};