const CustomerControleur = require("../controleur/customerDB");
const JWTMiddleWare = require("../middleware/IdentificationJWT");
const AuthoMiddleware = require("../middleware/Authorization");
const Router = require("express-promise-router");
const router = new Router;

/**
 * @swagger
 * /customer/{id}:
 *  get:
 *      tags:
 *         - Customer
 *      parameters:
 *          - name: id
 *            description: customer's ID
 *            in: path
 *            required: true
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              $ref: '#/components/responses/CustomerFound'
 *          404:
 *              description: Customer not found
 *          500:
 *              description: Server error
 *
 */
router.get('/', JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, CustomerControleur.getAllCustomers);

/**
 * @swagger
 * /customer:
 *  post:
 *      tags:
 *          - Customer
 *      requestBody:
 *          $ref: '#/components/requestBodies/CustomerToAdd'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/CustomerAdd'
 *          500:
 *              description: Server error
 *
 */
router.post('/', CustomerControleur.postCustomer);

/**
 * @swagger
 * /customer:
 *  patch:
 *      tags:
 *          - Customer
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          $ref: '#/components/requestBodies/CustomerToUpdate'
 *      responses:
 *          204:
 *              $ref: '#/components/responses/CustomerUpdated'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/isMyAccount'
 *          500:
 *              description: Server error
 *
 */
router.patch('/', JWTMiddleWare.identification, AuthoMiddleware.isMyAccount, CustomerControleur.updateCustomer);

module.exports = router;