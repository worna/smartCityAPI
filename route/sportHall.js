const SportHallControleur = require("../controleur/sportHallORM");
const Router = require("express-promise-router");
const JWTMiddleWare = require("../middleware/IdentificationJWT");
const AuthoMiddleware = require("../middleware/Authorization");
const router = new Router;

/**
 * @swagger
 * /sportHall/{id}:
 *  get:
 *      tags:
 *         - SportHall
 *      parameters:
 *          - name: id
 *            description: sport hall's ID
 *            in: path
 *            required: true
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              $ref: '#/components/responses/SportHallFound'
 *          404:
 *              description: Sport hall not found
 *          500:
 *              description: Server error
 *
 */
router.get('/:id', SportHallControleur.getSportHall);

/**
 * @swagger
 * /sportHall:
 *  post:
 *      tags:
 *          - SportHall
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          $ref: '#/components/requestBodies/SportHallToAdd'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/AddSportHall'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeManager'
 *          500:
 *              description: Server error
 *
 */
router.post('/', JWTMiddleWare.identification, AuthoMiddleware.mustBeManager, SportHallControleur.postSportHall);

/**
 * @swagger
 * /sportHall:
 *  patch:
 *      tags:
 *          - SportHall
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          $ref: '#/components/requestBodies/SportHallToUpdate'
 *      responses:
 *          204:
 *              $ref: '#/components/responses/SportHallUpdated'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeManager'
 *          500:
 *              description: Server error
 *
 */
router.patch('/', JWTMiddleWare.identification, AuthoMiddleware.mustBeManager, SportHallControleur.updateSportHall);

/**
 * @swagger
 * /sportHall:
 *  delete:
 *      tags:
 *          - SportHall
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              $ref: '#/components/responses/SportHallDeleted'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeManager'
 *          500:
 *              description: Server error
 *
 */
router.delete('/', JWTMiddleWare.identification, AuthoMiddleware.mustBeManager, SportHallControleur.deleteSportHall);

module.exports = router;
