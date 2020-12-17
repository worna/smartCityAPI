const {getCustomer} = require('./customerDB');
const {getManager} = require('./managerDB');
const {getAdmin} = require('./adminDB');
const {compareHash} = require('../utils/utils');


module.exports.getUser = async (client, email, password) => {
    const promises = [];
    const promiseCustomer = getCustomer(client, email);
    const promiseManager = getManager(client, email);
    const promiseAdmin = getAdmin(client, email);
    promises.push(promiseCustomer, promiseManager, promiseAdmin);
    const values = await Promise.all(promises);
    const customerRow = values[0].rows[0];
    const managerRow = values[1].rows[0];
    const adminRow = values[2].rows[0];
    if(customerRow !== undefined && await compareHash(password, customerRow.password)){
        return {userType: "customer", value: customerRow};
    } else if (managerRow !== undefined && await compareHash(password, managerRow.password)){
        return {userType: "manager", value: managerRow};
    } else if (adminRow !== undefined && await compareHash(password, adminRow.password)){
        return {userType: "admin", value: adminRow};
    }else {
        return {userType: "inconnu", value: null}
    }
};