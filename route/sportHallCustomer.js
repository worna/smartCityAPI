const SportHallCustomerControleur = require("../controleur/sportHallCustomerORM");
const JWTMiddleWare = require("../middleware/IdentificationJWT");
const AuthoMiddleware = require("../middleware/Authorization");
const Router = require("express-promise-router");
const router = new Router;


router.get('/sportHall/:id', JWTMiddleWare.identification, AuthoMiddleware.mustBeAdminOrManager, SportHallCustomerControleur.getCustomersInSportHall);
router.get('/customer/:email', JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, SportHallCustomerControleur.getSportHallsOfCustomer);

/**
 * @swagger
 * /sportHallCustomer:
 *  post:
 *      tags:
 *          - SportHallCustomer
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          $ref: '#/components/requestBodies/SportHallCustomerToAdd'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/AddSportHallCustomer'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/isMyAccountOrAdmin'
 *          500:
 *              description: Server error
 *
 */
router.post('/', JWTMiddleWare.identification, AuthoMiddleware.isMyAccountOrAdmin, SportHallCustomerControleur.postSportHallCustomer);

/**
 * @swagger
 * /sportHallCustomer:
 *  delete:
 *      tags:
 *          - SportHallCustomer
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              $ref: '#/components/responses/SportHallCustomerDeleted'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/isMyAccountOrAdmin'
 *          500:
 *              description: Server error
 *
 */
router.delete('/', JWTMiddleWare.identification, AuthoMiddleware.isMyAccountOrAdmin, SportHallCustomerControleur.deleteSportHallCustomer);

module.exports = router;
