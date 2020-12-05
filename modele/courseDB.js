module.exports.getCourse = async (id, client) => {
    return await client.query("SELECT * FROM course WHERE id = $1", [id]);
}

module.exports.postCourse = async (sportHall, startingDateTime, endingDateTime, level, activity, room, instructor, client) => {
    return await client.query("INSERT INTO course (id_sportHall, startingDateTime, endingDateTime, level, activity, room, id_instructor) VALUES ($1, $2, $3, $4, $5, $6, $7)", [sportHall, startingDateTime, endingDateTime, level, activity, room, instructor]);
}

module.exports.updateCourse = async (id, sportHall, startingDateTime, endingDateTime, level, activity, room, instructor, client) => {
    return await client.query("UPDATE course SET id_sportHall = $1, startingDateTime = $2, endingDateTime = $3, level = $4, activity = $5, room = $6, id_instructor = $7 WHERE id=$8", [sportHall, startingDateTime, endingDateTime, level, activity, room, instructor, id]);
}

module.exports.deleteCourse = async (id, client) => {
    return await client.query("DELETE FROM course WHERE id=$1", [id]);
}
