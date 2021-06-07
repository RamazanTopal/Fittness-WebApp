const express = require("express")
const pageController=require('../controllers/pageController')

const router=express.Router();


router.route('/').get(pageController.getIndex);
router.route('/about').get(pageController.getAbout);
router.route('/contact').get(pageController.getContact);
router.route('/gallery').get(pageController.getGalery);
router.route('/service').get(pageController.getService);
router.route('/service/:id').delete(pageController.deleteService);
router.route('/service/:id').put(pageController.putService);
router.route('/trainer').get(pageController.getTrainer);
router.route('/login').get(pageController.getLogin);
router.route('/logout').get(pageController.getLogout);

module.exports=router