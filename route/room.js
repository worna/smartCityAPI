const RoomControleur = require("../controleur/roomORM");
const JWTMiddleWare = require("../middleware/IdentificationJWT");
const AuthoMiddleware = require("../middleware/Authorization");
const Router = require("express-promise-router");
const router = new Router;

router.get('/:id', RoomControleur.getRoom);
router.post('/', JWTMiddleWare.identification, AuthoMiddleware.mustBeAdminOrManager, RoomControleur.postRoom);
router.patch('/', JWTMiddleWare.identification, AuthoMiddleware.mustBeAdminOrManager, RoomControleur.updateRoom);
router.delete('/', JWTMiddleWare.identification, AuthoMiddleware.mustBeAdminOrManager, RoomControleur.deleteRoom);

module.exports = router;
