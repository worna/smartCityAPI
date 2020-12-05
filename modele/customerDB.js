const {getHash} = require("../utils/utils");

module.exports.createCustomer = async (client, firstName, lastName, birthDate, gender, phoneNumber, email, password, inscriptionDate, isManager, isInstructor, language) => {
    return await client.query(`
        INSERT INTO customer(first_name, last_name, birth_date, gender, phone_number, email, password, inscription_date, is_manager, is_instructor, language)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`, [firstName, lastName, birthDate, gender, phoneNumber, email, await getHash(password), inscriptionDate, isManager, isInstructor, language]
    );
}
module.exports.customerExist = async (client, idCustomer) => {
    const {rows} = await client.query(
        "SELECT count(id) AS nbr FROM customer WHERE id = $1",
        [idCustomer]
    );
    return rows[0].nbr > 0;
}

module.exports.getCustomer = async (client, email) => {
    return await client.query(`
        SELECT * FROM customer WHERE email = $1 AND is_manager = 0 LIMIT 1;`, [email]);
}

module.exports.updateCustomer = async (client, id, firstName, lastName, birthDate, gender, phoneNumber, email, password, inscriptionDate, isManager, isInstructor, language) => {
    const params = [];
    const querySet = [];
    let query = "UPDATE customer SET ";
    if(firstName !== undefined){
        params.push(firstName);
        querySet.push(` first_name = $${params.length} `);
    }
    if(lastName !== undefined){
        params.push(lastName);
        querySet.push(` last_name = $${params.length} `);
    }
    if(birthDate !== undefined){
        params.push(birthDate);
        querySet.push(` birth_date = $${params.length} `);
    }
    if(gender !== undefined){
        params.push(gender);
        querySet.push(` gender = $${params.length} `);
    }
    if(phoneNumber !== undefined){
        params.push(phoneNumber);
        querySet.push(` phone_number = $${params.length} `);
    }
    if(email !== undefined){
        params.push(email);
        querySet.push(` email = $${params.length} `);
    }
    if(password !== undefined){
        params.push(await getHash(password));
        querySet.push(` password = $${params.length} `);
    }
    if(inscriptionDate !== undefined){
        params.push(inscriptionDate);
        querySet.push(` inscription_date = $${params.length} `);
    }
    if(isManager !== undefined){
        params.push(isManager);
        querySet.push(` is_manager = $${params.length} `);
    }
    if(isInstructor !== undefined){
        params.push(isInstructor);
        querySet.push(` is_instructor = $${params.length} `);
    }
    if(language !== undefined){
        params.push(language);
        querySet.push(` language = $${params.length} `);
    }

    if(params.length > 0){
        query += querySet.join(',');
        params.push(id);
        query += ` WHERE id = $${params.length}`;

        return client.query(query, params);
    } else {
        throw new Error("No field to update");
    }

   }