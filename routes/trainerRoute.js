const express = require("express")
const trainerController=require('../controllers/trainerController')

const router=express.Router();

router.route('/add_workout').get(trainerController.getWorkout);
router.route('/add_workout').post(trainerController.postWorkout);
//login
router.route('/login_trainer').get(trainerController.getLogin);
router.route('/login_trainer').post(trainerController.postLogin);
//register
router.route('/register_trainer').get(trainerController.getRegister);
router.route('/register_trainer').post(trainerController.postRegister);
//detail
router.route('/:id').get(trainerController.detailTrainer);
//delete
router.route('/:id').delete(trainerController.deleteAttender);


module.exports=router