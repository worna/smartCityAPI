const SportHallCustomerControleur = require("../controleur/sportHallCustomerORM");
const JWTMiddleWare = require("../middleware/IdentificationJWT");
const AuthoMiddleware = require("../middleware/Authorization");
const Router = require("express-promise-router");
const router = new Router;

/**
 * @swagger
 * /sportHallCustomer/sportHall/{id}:
 *  get:
 *      tags:
 *         - SportHallCustomer
 *      parameters:
 *          - name: id
 *            description: sport hall's ID
 *            in: path
 *            required: true
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              $ref: '#/components/responses/CustomersOfSportHallFound'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeAdminOrManager'
 *          404:
 *              description: Sport hall not found or don't have customer
 *          500:
 *              description: Server error
 *
 */
router.get('/sportHall/:id', JWTMiddleWare.identification, AuthoMiddleware.mustBeAdminOrManager, SportHallCustomerControleur.getCustomersInSportHall);

/**
 * @swagger
 * /sportHallCustomer/customer/{email}:
 *  get:
 *      tags:
 *         - SportHallCustomer
 *      parameters:
 *          - name: email
 *            description: customer's email
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              $ref: '#/components/responses/SportHallsOfCustomerFound'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeAdmin'
 *          404:
 *              description: The customer is not found or don't have sport hall
 *          500:
 *              description: Server error
 *
 */
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
 *              $ref: '#/components/responses/AddedCustomerToSportHall'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/isMyAccountOrAdmin'
 *          404:
 *              description: The sport hall or customer is not found
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
