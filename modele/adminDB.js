const {getHash} = require("../utils/utils");

module.exports.getAdmin = async (client, email) => {
    return await client.query(`
        SELECT * FROM admin WHERE email = $1 LIMIT 1;
    `, [email]);
}

module.exports.postAdmin = async (email, password, client) => {
    return await client.query("INSERT INTO admin(email, password) VALUES ($1, $2)",[email, await getHash(password)]);
}
