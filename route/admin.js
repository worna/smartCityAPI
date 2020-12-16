const AdminControleur = require("../controleur/adminDB");
const Router = require("express-promise-router");
const JWTMiddleWare = require("../middleware/IdentificationJWT");
const AuthoMiddleware = require("../middleware/Authorization");
const router = new Router;

/**
 * @swagger
 * /admin:
 *  post:
 *      tags:
 *          - Admin
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          $ref: '#/components/requestBodies/AdminToAdd'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/AdminAdd'
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
router.post('/', JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, AdminControleur.postAdmin);
module.exports = router;