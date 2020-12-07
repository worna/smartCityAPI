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
        res.sendStatus(403);
    }
}
module.exports.mustBeAdmin = (req, res, next) => {
    if(req.session && req.session.authLevel === "admin"){
        next();
    } else {
        res.sendStatus(403);
    }
}
