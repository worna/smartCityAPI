require("dotenv").config();
const process = require('process');
const jwt = require('jsonwebtoken');
const pool = require('../modele/database');
const userDB = require('../modele/userDB');

/**
 * @swagger
 * components:
 *  schemas:
 *      Login:
 *          type: object
 *          properties:
 *              email:
 *                  type: string
 *              password:
 *                  type: string
 *                  format: password
 *          required:
 *              - email
 *              - password
 */
module.exports.login = async (req, res) => {
    const {email, password} = req.body;
    if(email === undefined || password === undefined){
        res.sendStatus(400);
    } else {
        const client = await pool.connect();
        try {
            const result = await userDB.getUser(client, email, password);
            const {userType, value} = result;
            if (userType === "inconnu") {
                res.sendStatus(404);
            } else if (userType === "manager") {
                const {id, last_name} = value;
                const payload = {status: userType, value: {id, last_name}};
                const token = jwt.sign(
                    payload,
                    process.env.SECRET_TOKEN,
                    {expiresIn: '1d'}
                );
                res.json(token);

            } else {
                const {id, last_name, first_name} = value;
                const payload = {status: userType, value: {id, last_name, first_name}};
                const token = jwt.sign(
                    payload,
                    process.env.SECRET_TOKEN,
                    {expiresIn: '1d'}
                );
                res.json(token);
            }
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        } finally {
            client.release();
        }
    }
};