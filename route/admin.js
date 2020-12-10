const AdminControleur = require("../controleur/adminDB");
const Router = require("express-promise-router");
const JWTMiddleWare = require("../middleware/IdentificationJWT");
const AuthoMiddleware = require("../middleware/Authorization");
const router = new Router;

router.post('/', JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, AdminControleur.postAdmin);
module.exports = router;