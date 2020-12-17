const ManagerControleur = require("../controleur/managerDB");
const CustomerControleur = require("../controleur/customerDB")
const JWTMiddleWare = require("../middleware/IdentificationJWT");
const AuthoMiddleware = require("../middleware/Authorization");
const Router = require("express-promise-router");
const router = new Router;

/**
 * @swagger
 * /manager:
 *  post:
 *      tags:
 *          - Manager
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          $ref: '#/components/requestBodies/ManagerToAdd'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/ManagerAdd'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeAdmin'
 *          500:
 *              description: Server error
 *
 */
router.post('/',JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, ManagerControleur.postManager);

/**
 * @swagger
 * /manager:
 *  patch:
 *      tags:
 *          - Manager
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          $ref: '#/components/requestBodies/ManagerToUpdate'
 *      responses:
 *          204:
 *              $ref: '#/components/responses/ManagerUpdated'
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