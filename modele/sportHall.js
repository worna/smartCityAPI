const sportHall = [
    {id: 1, name: "Mouvements", manager: "Vicky", phoneNumber: "0496818836", email: "etu41165@henallux.be"},
    {id: 2, name: "Jims", manager: "Arnaud", phoneNumber: "0497552233", email: "etu40153@student.henallux.be"},
    {id: 3, name: "Basic Fit", manager: "Benjamin", phoneNumber: "0496327859", email: "benjamin@hotmail.com"}
] 

module.exports.getSportHall = (id) => {
    const resultats = sportHall.filter(s => s.id === id);
    if(resultats.length > 0) {
        return resultats[0];
    } else {
        throw new Error("Aucun sportHall trouvé");
    }
}

module.exports.postSportHall = (id, name, manager, phoneNumber, email) => {
    sportHall.push({
        id,
        name,
        manager,
        phoneNumber,
        email
    });
    return true;
}

module.exports.updateName = (id, name) => {
    for(let i = 0 ; i < sportHall.length; i++) {
        if(sportHall[i].id === id) {
            sportHall[i].name = name;
            return true;
        }
    }
    return false; 
}

module.exports.updateManager = (id, manager) => {
    for(let i = 0 ; i < sportHall.length; i++) {
        if(sportHall[i].id === id) {
            sportHall[i].manager = manager;
            return true;
        }
    }
    return false; 
}

module.exports.updatePhoneNumber = (id, phoneNumber) => {
    for(let i = 0 ; i < sportHall.length; i++) {
        if(sportHall[i].id === id) {
            sportHall[i].phoneNumber = phoneNumber;
            return true;
        }
    }
    return false; 
}

module.exports.updateEmail = (id, email) => {
    for(let i = 0 ; i < sportHall.length; i++) {
        if(sportHall[i].id === id) {
            sportHall[i].email = email;
            return true;
        }
    }
    return false; 
}

module.exports.deleteSportHall = (id) => {
    for(let i=0; i < sportHall.length; i++) {
        if(sportHall[i].id === id) {
            sportHall.splice(i, 1);
            return true;
        }
    }
    return true;
}