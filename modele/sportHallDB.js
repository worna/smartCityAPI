module.exports.getSportHall = async (id, client) => {
    return await client.query("SELECT * FROM sportHall WHERE id = $1", [id]);
}
module.exports.postSportHall = async (name, manager, phoneNumber, email, client) => {
    return await client.query("INSERT INTO sportHall (name, manager, phoneNumber, email) VALUES ($1, $2, $3, $4)", [name, manager, phoneNumber, email]);
}

module.exports.updateSportHall = async (id, name, manager, phoneNumber, email, client) => {
    return await client.query("UPDATE sportHall SET name = $1, manager = $2, phoneNumber = $3, email = $4 WHERE id = $5", [name, manager, phoneNumber, email, id]);
}

module.exports.deleteSportHall = async (id, client) => {
    return await client.query("DELETE FROM sportHall WHERE id = $1", [id]);
}

module.exports.sportHallExist = async (client, idSportHall) => {
    const {rows} = await client.query(
        "SELECT count(id) AS nbr FROM sportHall WHERE id = $1",
        [idSportHall]
    );
    return rows[0].nbr > 0;
}