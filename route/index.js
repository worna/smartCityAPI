const SportHallRouter = require('./sportHall');
const CourseRouter = require('./course');
const SportHallCustomerRouter = require('./sportHallCustomer');
const CustomerRouter = require('./customer');
const UserRouter = require('./user');
const AdminRouter = require('./admin');
const ManagerRouter = require('./manager')

const router = require("express").Router();

router.use("/sportHall", SportHallRouter);
router.use("/course", CourseRouter);
router.use("/sportHallCustomer", SportHallCustomerRouter);
router.use("/customer", CustomerRouter);
router.use("/user", UserRouter);
router.use("/admin", AdminRouter);
router.use("/manager", ManagerRouter);

router.use("/", (req, res) => res.sendStatus(201));

module.exports = router;