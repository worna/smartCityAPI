const CustomerCourseControleur = require("../controleur/customerCourseORM");

const Router = require("express-promise-router");
const router = new Router;

router.post('/', CustomerCourseControleur.postCustomerCourse);

router.get('/course/:id', CustomerCourseControleur.getCustomersInCourse);
router.get('/customer/:id', CustomerCourseControleur.getCoursesOfCustomer);
module.exports = router;
