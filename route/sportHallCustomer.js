const SportHallCustomerControleur = require("../controleur/sportHallCustomerORM");
const JWTMiddleWare = require("../middleware/IdentificationJWT");
const AuthoMiddleware = require("../middleware/Authorization");
const Router = require("express-promise-router");
const router = new Router;

/**
 * @swagger
 * /sportHallCustomer:
 *  post:
 *      tags:
 *          - SportHallCustomer
 *      requestBody:
 *          $ref: '#/components/requestBodies/AddCustomerToSportHall'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/AddedCustomerToSportHall'
 *          404:
 *              $ref: '#/components/responses/SportHallDoesNotExist'
 *          500:
 *              description: Erreur serveur
 *
 */
router.post('/', SportHallCustomerControleur.postSportHallCustomer);
router.get('/sportHall/:id', JWTMiddleWare.identification, AuthoMiddleware.mustBeAdminOrManager, SportHallCustomerControleur.getCustomersInSportHall);
router.get('/customer/:email', SportHallCustomerControleur.getSportHallsOfCustomer);
router.delete('/', SportHallCustomerControleur.deleteSportHallCustomer);
module.exports = router;
