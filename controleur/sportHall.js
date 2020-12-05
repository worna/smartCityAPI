const SportHallModele = require("../modele/sportHall");

module.exports.getSportHall = (req, res) => {
    const idTexte = req.params.id;
    const id = parseInt(idTexte);
    if(isNaN(id)) {
        res.sendStatus(400);
    } else {
        try {
            const sportHall = SportHallModele.getSportHall(id);
            res.json(sportHall);
        } catch (error) {
            res.sendStatus(404);
        }
    }   
}

module.exports.postSportHall = (req, res) => {
    const body = req.body;
    const {id, name, manager, phoneNumber, email} = body;
    const reponse = SportHallModele.postSportHall(id, name, manager, phoneNumber, email);
    if(reponse) {
        res.sendStatus(201);
    } else {
        res.sendStatus(500);
    }
}

module.exports.updateName = (req, res) => {
    const {id, name} = req.body;
    const reponse = SportHallModele.updateName(id, name);
    if(reponse) {
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
}

module.exports.updateManager = (req, res) => {
    const {id, manager} = req.body;
    const reponse = SportHallModele.updateManager(id, manager);
    if(reponse) {
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
}

module.exports.updatePhoneNumber = (req, res) => {
    const {id, phoneNumber} = req.body;
    const reponse = SportHallModele.updatePhoneNumber(id, phoneNumber);
    if(reponse) {
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
}

module.exports.updateEmail = (req, res) => {
    const {id, email} = req.body;
    const reponse = SportHallModele.updateEmail(id, email);
    if(reponse) {
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
}

module.exports.deleteSportHall = (req, res) => {
    const {id} = req.body;
    const reponse = SportHallModele.deleteSportHall(id);
    if(reponse) {
        res.sendStatus(204);
    } else {
        res.sendStatus(500);
    }
}