const router = require('express').Router();
const { register, Login, getUsers } = require('./controller/authentication')


router.get("/users", getUsers);
router.post("/register", register);
router.post("/login", Login);

module.exports = router;