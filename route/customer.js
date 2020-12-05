const CustomerControleur = require("../controleur/customerDB");
const JWTMiddleWare = require("../middleware/IdentificationJWT");

const Router = require("express-promise-router");
const router = new Router;

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
router.post('/', CustomerControleur.inscriptionCustomer);

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
 *          500:
 *              description: Server error
 *
 */
router.patch('/', JWTMiddleWare.identification, CustomerControleur.updateCustomer);

module.exports = router;