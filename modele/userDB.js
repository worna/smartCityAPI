const {getCustomer} = require('./customerDB');
const {getManager} = require('./managerDB');
const {compareHash} = require('../utils/utils');

module.exports.getUser = async (client, email, password) => {
    const promises = [];
    const promiseCustomer = getCustomer(client, email);
    const promiseManager = getManager(client, email);
    promises.push(promiseCustomer, promiseManager);
    const values = await Promise.all(promises);
    const customerRow = values[0].rows[0];
    const managerRow = values[1].rows[0];
    if(customerRow !== undefined && await compareHash(password, customerRow.password)){
        return {userType: "customer", value: customerRow};
    } else if (managerRow !== undefined && await compareHash(password, managerRow.password)){
        return {userType: "manager", value: managerRow};
    } else {
        return {userType: "inconnu", value: null}
    }
};