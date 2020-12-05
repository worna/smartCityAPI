module.exports.insertSportHallCustomer = async (client, id_sport_hall, id_customer) => {
    return await client.query(`
        INSERT INTO sport_hall_customer(id_sport_hall, id_customer) VALUES
        ($1, $2)`, [id_sport_hall, id_customer]
    );
}

