require("dotenv").config();
const process = require('process');
const jwt = require('jsonwebtoken');
const pool = require('../modele/database');
const userDB = require('../modele/userDB');
const managerDB = require('../modele/managerDB');


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
        console.log("Parameters are wrong or empty");
        res.sendStatus(400);
    } else {
        const client = await pool.connect();
        try {
            const result = await userDB.getUser(client, email, password);
            const {userType, value} = result;
            if (userType === "inconnu") {
                console.log("You don't have account");
                res.sendStatus(404);
            } else if (userType === "admin") {
                const {email} = value;
                const payload = {status: userType, value: {email}};
                const token = jwt.sign(
                    payload,
                    process.env.SECRET_TOKEN,
                    {expiresIn: '1d'}
                );
                res.json(token);
            } else if (userType === "manager") {
                const {id, email} = value;
                const sport_halls = await managerDB.getSportHallIds(client, email);
                const sport_halls_ids = [];
                for(const sport_hall of sport_halls.rows) {
                    const {id_sport_hall} = sport_hall;
                    sport_halls_ids.push(id_sport_hall);
                }

                const payload = {status: userType, value: {email, sport_halls_ids}};
                const token = jwt.sign(
                    payload,
                    process.env.SECRET_TOKEN,
                    {expiresIn: '1d'}
                );
                res.json(token);
            } else {
                const {email, last_name, first_name} = value;
                const payload = {status: userType, value: {email, last_name, first_name}};
                const token = jwt.sign(
                    payload,
                    process.env.SECRET_TOKEN,
                    {expiresIn: '1d'}
                );
                res.json(token);
            }
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        } finally {
            client.release();
        }
    }
};