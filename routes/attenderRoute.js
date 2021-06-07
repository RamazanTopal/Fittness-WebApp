const express = require("express")
const attenderController=require('../controllers/attenderController')

const router=express.Router();

//login
router.route('/login_attender').get(attenderController.getLogin);
router.route('/login_attender').post(attenderController.postLogin);
//register
router.route('/register_attender').get(attenderController.getRegister);
router.route('/register_attender').post(attenderController.postRegister);



module.exports=router