const CourseORM = require('../ORM/model/Course');
/**
 *@swagger
 * components:
 *  responses:
 *      mustBeManager:
 *          description: The requested action can only be performed by a manager
 */
module.exports.mustBeManager = (req, res, next) => {
    if(req.session && req.session.authLevel === "manager"){
        next();
    } else {
        console.log("You must be manager");
        res.sendStatus(403);
    }
}
module.exports.mustBeAdminOrManager = async (req, res, next) => {
    if(req.session && (req.session.authLevel === "admin" ||  req.session.authLevel === "manager" && (req.baseUrl == "/sportHall" && req.session.sport_halls_ids.includes(req.body.id) || req.baseUrl == "/sportHallCustomer" && req.session.sport_halls_ids.includes(parseInt(req.params.id)) || req.baseUrl == "/course" && (req.route.methods.delete && req.session.sport_halls_ids.includes(await getSportHallIdWithCourseId(parseInt(req.body.id)))|| !req.route.methods.delete && req.session.sport_halls_ids.includes(req.body.id_sport_hall)) || req.baseUrl == "/customerCourse"  && req.session.sport_halls_ids.includes(await getSportHallIdWithCourseId(parseInt(req.params.id))) || req.baseUrl == "/room" && req.session.sport_halls_ids.includes(req.body.id_sport_hall)))){
        next();
    } else {
        console.log("You must be admin or manager of the sport hall");
        res.sendStatus(403);
    }
}
module.exports.mustBeAdmin = (req, res, next) => {
    if(req.session && req.session.authLevel === "admin"){
        next();
    } else {
        console.log("You must be admin");
        res.sendStatus(403);
    }
}
module.exports.isMyAccount = (req, res, next) => {
    if(req.session && req.session.email === req.body.email){
        next();
    } else {
        console.log("It's must be your account");
        res.sendStatus(403);
    }
}
module.exports.isMyAccountOrAdmin = (req, res, next) => {
    if(req.session && (req.session.authLevel === "admin" || req.session.email === req.params.email || req.session.email === req.body.email_customer)){
        next();
    } else {
        console.log("It's must be your account");
        res.sendStatus(403);
    }
}
async function getSportHallIdWithCourseId (course_id){
    const courseDB = await CourseORM.findOne({ where : {id: course_id}});
    if(courseDB !== null){
        const {id_sport_hall} = courseDB;
        return id_sport_hall;
    }
    return -1;
}