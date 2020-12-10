module.exports.getManager = async (client, email) => {
    return await client.query(`
        SELECT * FROM customer WHERE email = $1 AND is_manager = 1 LIMIT 1;
    `, [email]);
}
module.exports.postManager = async (client, firstName, lastName, birthDate, gender, phoneNumber, email, password, inscriptionDate, isInstructor, language) => {
    return await client.query(`
        INSERT INTO customer(first_name, last_name, birth_date, gender, phone_number, email, password, inscription_date, is_manager, is_instructor, language)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 1, $9, $10)`, [firstName, lastName, birthDate, gender, phoneNumber, email, await getHash(password), inscriptionDate, isInstructor, language]
    );
}
module.exports.getSportHallId = async (client, id) => {
    return await client.query(`
        SELECT id as id_sport_hall FROM sport_hall WHERE manager = $1 LIMIT 1;
    `,[id]);
}