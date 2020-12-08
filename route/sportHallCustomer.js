const SportHallCustomerControleur = require("../controleur/sportHallCustomerORM");

const Router = require("express-promise-router");
const router = new Router;

/**
 * @swagger
 * /sportHallCustomer:
 *  post:
 *      tags:
 *          - SportHallCustomer
 *      requestBody:
 *          $ref: '#/components/requestBodies/AddCustomerToSportHall'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/AddedCustomerToSportHall'
 *          404:
 *              $ref: '#/components/responses/SportHallDoesNotExist'
 *          500:
 *              description: Erreur serveur
 *
 */
router.post('/', SportHallCustomerControleur.postSportHallCustomer);

router.get('/sportHall/:id', SportHallCustomerControleur.getCustomersInSportHall);
router.get('/customer/:id', SportHallCustomerControleur.getSportHallsOfCustomer);
module.exports = router;
