module.exports.getManager = async (client, email) => {
    return await client.query(`
        SELECT * FROM customer WHERE email = $1 AND is_manager = 1 LIMIT 1;
    `, [email]);
}
