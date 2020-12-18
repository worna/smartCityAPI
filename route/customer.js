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
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/isMyAccountOrAdmin'
 *          404:
 *              description: Impossible to find the customer
 *          500:
 *              description: Server error
 *
 */
router.get('/:email', JWTMiddleWare.identification, AuthoMiddleware.isMyAccountOrAdmin, CustomerControleur.getCustomer);

/**
 * @swagger
 * /customer:
 *  get:
 *      tags:
 *         - Customer
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              $ref: '#/components/responses/CustomersFound'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeAdmin'
 *          404:
 *              description: Customers not found
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
 *          400:
 *              $ref: '#/components/responses/IncorrectCustomerBody'
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
 *          404:
 *              description: Customer not found
 *          500:
 *              description: Server error
 *
 */
router.patch('/', JWTMiddleWare.identification, AuthoMiddleware.isMyAccount, CustomerControleur.updateCustomer);

/**
 * @swagger
 * /customer:
 *  delete:
 *      tags:
 *          - Customer
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          204:
 *              $ref: '#/components/responses/CustomerDeleted'
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
router.delete('/', JWTMiddleWare.identification, AuthoMiddleware.isMyAccountOrAdmin, CustomerControleur.deleteCustomer);

module.exports = router;