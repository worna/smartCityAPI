const RoomControleur = require("../controleur/roomORM");
const JWTMiddleWare = require("../middleware/IdentificationJWT");
const AuthoMiddleware = require("../middleware/Authorization");
const Router = require("express-promise-router");
const router = new Router;

router.get('/:id', RoomControleur.getRoom);
router.post('/', JWTMiddleWare.identification, AuthoMiddleware.mustBeManager, RoomControleur.postRoom);
router.patch('/', JWTMiddleWare.identification, AuthoMiddleware.mustBeManager, RoomControleur.updateRoom);
router.delete('/', JWTMiddleWare.identification, AuthoMiddleware.mustBeManager, RoomControleur.deleteRoom);

module.exports = router;
