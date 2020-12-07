require("dotenv").config();
const pool = require('../modele/database');
const AdminModele = require("../modele/adminDB");



module.exports.postAdmin = async (req, res) => {
    const {email, password} = req.body;
    if(email === undefined || password === undefined){
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