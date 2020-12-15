const RoomControleur = require("../controleur/roomORM");
const JWTMiddleWare = require("../middleware/IdentificationJWT");
const AuthoMiddleware = require("../middleware/Authorization");
const Router = require("express-promise-router");
const router = new Router;

/**
 * @swagger
 * /room/{id}:
 *  get:
 *      tags:
 *         - Room
 *      parameters:
 *          - name: id
 *            description: room's ID
 *            in: path
 *            required: true
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              $ref: '#/components/responses/RoomFound'
 *          404:
 *              description: Room not found
 *          500:
 *              description: Server error
 *
 */
router.get('/:id', RoomControleur.getRoom);

/**
 * @swagger
 * /room:
 *  post:
 *      tags:
 *          - Room
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          $ref: '#/components/requestBodies/RoomToAdd'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/AddRoom'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeAdminOrManager'
 *          500:
 *              description: Server error
 *
 */
router.post('/', JWTMiddleWare.identification, AuthoMiddleware.mustBeAdminOrManager, RoomControleur.postRoom);

/**
 * @swagger
 * /room:
 *  patch:
 *      tags:
 *          - Room
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          $ref: '#/components/requestBodies/RoomToUpdate'
 *      responses:
 *          204:
 *              $ref: '#/components/responses/RoomUpdated'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeAdminOrManager'
 *          500:
 *              description: Server error
 *
 */
router.patch('/', JWTMiddleWare.identification, AuthoMiddleware.mustBeAdminOrManager, RoomControleur.updateRoom);

/**
 * @swagger
 * /room:
 *  delete:
 *      tags:
 *          - Room
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              $ref: '#/components/responses/RoomDeleted'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeAdminOrManager'
 *          500:
 *              description: Server error
 *
 */
router.delete('/', JWTMiddleWare.identification, AuthoMiddleware.mustBeAdminOrManager, RoomControleur.deleteRoom);

module.exports = router;
