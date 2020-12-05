const CustomerDB = require('../modele/customerDB');
const ManagerDB = require('../modele/managerDB');
const pool = require('../modele/database');

module.exports.identification = async (req, res, next) => {
    const headerAuth = req.get('authorization');
    if(headerAuth && headerAuth.includes("Basic")){
        const base64Login =  headerAuth.split(' ')[1];
        const login = Buffer.from(base64Login, 'base64').toString('utf-8');
        const [email, password] = login.split(':');
        const client = await pool.connect();
        try{
            const {rows} = await CustomerDB.getCustomer(client, email, password);
            const user = rows[0];
            if(user){
                req.session = user;
                next();
            } else {
                res.sendStatus(401);
            }
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        } finally {
            client.release();
        }
    } else {
        res.sendStatus(401);
    }
}

module.exports.identificationWithAuth = async (req, res, next) => {
    const headerAuth = req.get('authorization');
    if(headerAuth && headerAuth.includes("Basic")){
        const base64Login =  headerAuth.split(' ')[1];
        const login = Buffer.from(base64Login, 'base64').toString('utf-8');
        const [email, password] = login.split(':');
        const client = await pool.connect();
        try{
            const {rows: rowsManager} = await ManagerDB.getManager(client, email, password);
            const {rows: rowsCustomer} = await CustomerDB.getCustomer(client, email, password);
            const manager = rowsManager[0];
            const customer = rowsCustomer[0];
            if(manager){
                req.session = manager;
                req.session.authLevel = "manager";
                next();
            }
            else if(customer){
                req.session = customer;
                req.session.authLevel = "customer";
                next();
            } else {
                res.sendStatus(401);
            }
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        } finally {
            client.release();
        }
    } else {
        res.sendStatus(401);
    }
}