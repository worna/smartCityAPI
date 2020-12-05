const courses = [
    {id: 1, startingDateTime: "24-11-2020 13h10", endingDateTime: "24-11-2020 15h00", level: "A voir si on a des problèmes", activity: "Développement de client Web avancé", room: "A distance"},
    {id: 2, startingDateTime: "27-12-2020 08h30", endingDateTime: "27-12-2020 10h00", level: "Facile", activity: "HIP HOP", room: "salle bleue"},
    {id: 3, startingDateTime: "27-12-2020 09h00", endingDateTime: "27-12-2020 10h00", level: "Enfant (10-14)", activity: "Break", room: "salle n°2"}
    ]

module.exports.getCourse = (id) => {
    const resultats = courses.filter(c => c.id === id);
    if(resultats.length > 0) {
        return resultats[0];
    } else {
        throw new Error("Aucun cours trouvé");
    }
}

module.exports.postCourse = (id, startingDateTime, endingDateTime, level, activity, room) => {
    courses.push({
        id,
        startingDateTime,
        endingDateTime,
        level,
        activity,
        room
    });
    return true;
}

module.exports.updateStartingDateTime = (id, startingDateTime) => {
    for(let i = 0 ; i < courses.length; i++) {
        if(courses[i].id === id) {
            courses[i].startingDateTime = startingDateTime;
            return true;
        }
    }
    return false; 
}

module.exports.updateEndingDateTime = (id, endingDateTime) => {
    for(let i = 0 ; i < courses.length; i++) {
        if(courses[i].id === id) {
            courses[i].endingDateTime = endingDateTime;
            return true;
        }
    }
    return false; 
}

module.exports.updateLevel = (id, level) => {
    for(let i = 0 ; i < courses.length; i++) {
        if(courses[i].id === id) {
            courses[i].level = level;
            return true;
        }
    }
    return false; 
}

module.exports.updateActivity = (id, activity) => {
    for(let i = 0 ; i < courses.length; i++) {
        if(courses[i].id === id) {
            courses[i].activity = activity;
            return true;
        }
    }
    return false; 
}

module.exports.updateRoom = (id, room) => {
    for(let i = 0 ; i < courses.length; i++) {
        if(courses[i].id === id) {
            courses[i].room = room;
            return true;
        }
    }
    return false;
}

module.exports.deleteCourse = (id) => {
    for(let i=0; i < courses.length; i++) {
        if(courses[i].id === id) {
            courses.splice(i, 1);
            return true;
        }
    }
    return true;
}