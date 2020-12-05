const Router = require("express-promise-router");
const router = new Router;
const userController = require('../controleur/userDB');

/**
 * @swagger
 * /user/login:
 *  post:
 *      tags:
 *          - User
 *      description: send a JWT token for the identification
 *      requestBody:
 *          description: login for connexion
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Login'
 *      responses:
 *          200:
 *            description: a JWT token
 *            content:
 *                text/plain:
 *                    schema:
 *                        type: string
 *
 */
router.post('/login', userController.login);

module.exports = router;