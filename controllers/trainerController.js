const Workout=require('../models/workouts');
const Trainer=require('../models/trainer');
const bcrypt=require('bcrypt');
exports.getWorkout=async (req,res)=>{
    res.render("add_workout",{
        page_name:'add_workout'
    })
}
exports.postWorkout=async (req,res)=>{
    const work=await Workout.create(req.body)
    const trainer=await Trainer.findById(req.session.userID);
    await trainer.workout.push({_id:work._id});
    await trainer.save();
    res.redirect("/trainer/add_workout")
}
//register
exports.getRegister=async (req,res)=>{
    res.render("register_trainer",{
        page_name:'login'
    })
}
exports.postRegister=async (req,res)=>{
    await Trainer.create(req.body);
    res.redirect("/trainer/login_trainer")
}
//login
exports.getLogin=async (req,res)=>{

    res.render("login_trainer",{
        page_name:'login'
    })
}
exports.postLogin=async (req,res)=>{
    const {email,password}= req.body;
    await Trainer.findOne({email},(err,user)=>{
        if(user){
            bcrypt.compare(password,user.password,(err,same)=>{
                if(same){
                    req.session.userID=user._id;
                    req.session.userROLE=user.role;
                    res.redirect("/");
                }
            })
        }
    })
  
}