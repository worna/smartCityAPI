const {getHash} = require("../utils/utils");

module.exports.createCustomer = async (client, firstName, lastName, birthDate, gender, phoneNumber, email, password, language, address, city_name, zip_code, country) => {
    return await client.query(`
        INSERT INTO customer(first_name, last_name, birth_date, gender, phone_number, email, password, inscription_date, is_manager, is_instructor, language , address, city_name, zip_code, country)
        VALUES ($1, $2, $3, $4, $5, $6, $7, current_timestamp, 0, 0, $8, $9, $10, $11, $12)`, [firstName, lastName, birthDate, gender, phoneNumber, email, await getHash(password), language, address, city_name, zip_code, country]
    );
}

module.exports.customerExist = async (client, email) => {
    const {rows} = await client.query(
        "SELECT count(id) AS nbr FROM customer WHERE email = $1 AND is_manager = 0;",
        [email]
    );
    return rows[0].nbr > 0;
}

module.exports.getCustomer = async (client, email) => {
    return await client.query(`
        SELECT * FROM customer WHERE email = $1 AND is_manager = 0 LIMIT 1;`, [email]);
}

module.exports.updateCustomer = async (client, email, firstName, lastName, birthDate, gender, phoneNumber, newEmail, password, language, address, city_name, zip_code, country) => {
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
    if(newEmail !== undefined){
        params.push(newEmail);
        querySet.push(` email = $${params.length} `);
    }
    if(password !== undefined){
        params.push(await getHash(password));
        querySet.push(` password = $${params.length} `);
    }
    if(language !== undefined){
        params.push(language);
        querySet.push(` language = $${params.length} `);
    }
    if(address !== undefined){
        params.push(address);
        querySet.push(` address = $${params.length} `);
    }
    if(city_name !== undefined){
        params.push(city_name);
        querySet.push(` city_name = $${params.length} `);
    }
    if(zip_code !== undefined){
        params.push(zip_code);
        querySet.push(` zip_code = $${params.length} `);
    }
    if(country !== undefined){
        params.push(country);
        querySet.push(` country = $${params.length} `);
    }

    if(params.length > 0){
        query += querySet.join(',');
        params.push(email);
        query += ` WHERE email = $${params.length}`;

        return client.query(query, params);
    } else {
        throw new Error("No field to update");
    }

   }