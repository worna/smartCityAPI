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
module.exports.mustBeAdminOrManager = (req, res, next) => {
    if(req.session && (req.session.authLevel === "admin" ||  req.session.authLevel === "manager" && req.session.id_sport_hall === req.body.id_sport_hall)){
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
