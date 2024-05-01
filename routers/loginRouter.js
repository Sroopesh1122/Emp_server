const { adminLogin, createLogin } = require('../controllers/employeeController')

const router = require('express').Router()

router.post("/login",adminLogin)
router.post("/create",createLogin)


module.exports=router