const ManagerControleur = require("../controleur/managerDB");
const CustomerControleur = require("../controleur/customerDB")
const JWTMiddleWare = require("../middleware/IdentificationJWT");
const AuthoMiddleware = require("../middleware/Authorization");
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
router.post('/',JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, ManagerControleur.postManager);

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
router.patch('/', JWTMiddleWare.identification, AuthoMiddleware.isMyAccountOrAdmin, CustomerControleur.updateCustomer);

module.exports = router;