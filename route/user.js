const Router = require("express-promise-router");
const router = new Router;
const userController = require('../controleur/userDB');

/**
 * @swagger
 * /user/login:
 *  post:
 *      tags:
 *          - User
 *      description: Send back a JWT token for the identification
 *      requestBody:
 *          description: login for connexion
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Login'
 *      responses:
 *          201:
 *            description: a JWT token
 *            content:
 *                text/plain:
 *                    schema:
 *                        type: string
 *          400:
 *              description: Email and/or password are empty
 *          404:
 *              description: User not found
 *          500:
 *              description: Server error
 *
 */
router.post('/login', userController.login);

module.exports = router;