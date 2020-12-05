const CourseModele = require("../modele/course");

module.exports.getCourse = (req, res) => {
    const idTexte = req.params.id;
    const id = parseInt(idTexte);
    if(isNaN(id)) {
        res.sendStatus(400);
    } else {
        try {
            const course = CourseModele.getCourse(id);
            res.json(course);
        } catch (error) {
            res.sendStatus(404);
        }
    }   
}

module.exports.postCourse = (req, res) => {
    const body = req.body;
    const {id, sportHall, startingDateTime, endingDateTime, level, activity, room, instructor} = body;
    const reponse = CourseModele.postCourse(id, sportHall, startingDateTime, endingDateTime, level, activity, room, instructor);
    if(reponse) {
        res.sendStatus(201);
    } else {
        res.sendStatus(500);
    }
}

module.exports.updateStartingDateTime = (req, res) => {
    const {id, startingDateTime} = req.body;
    const reponse = CourseModele.updateStartingDateTime(id, startingDateTime);
    if(reponse) {
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
}

module.exports.updateEndingDateTime = (req, res) => {
    const {id, endingDateTime} = req.body;
    const reponse = CourseModele.updateEndingDateTime(id, endingDateTime);
    if(reponse) {
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
}

module.exports.updateLevel = (req, res) => {
    const {id, level} = req.body;
    const reponse = CourseModele.updateLevel(id, level);
    if(reponse) {
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
}

module.exports.updateActivity = (req, res) => {
    const {id, activity} = req.body;
    const reponse = CourseModele.updateActivity(id, activity);
    if(reponse) {
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
}

module.exports.updateRoom = (req, res) => {
    const {id, room} = req.body;
    const reponse = CourseModele.updateRoom(id, room);
    if(reponse) {
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
}

module.exports.deleteCourse = (req, res) => {
    const {id} = req.body;
    const reponse = CourseModele.deleteCourse(id);
    if(reponse) {
        res.sendStatus(204);
    } else {
        res.sendStatus(500);
    }
}