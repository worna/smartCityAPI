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
