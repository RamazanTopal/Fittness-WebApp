const Workout=require('../models/workouts');
const Trainer=require('../models/trainer');
const Attender=require('../models/attender');
const bcrypt=require('bcrypt');
exports.getWorkout=async (req,res)=>{
    res.render("add_workout",{
        page_name:'add_workout'
    })
}
exports.postWorkout=async (req,res)=>{
    let uploadeImage = req.files.image;
    let uploadPath = __dirname + '/../public/uploads/' + uploadeImage.name;
    uploadeImage.mv(uploadPath, async () => {
    
    const work=await Workout.create({
        name:req.body.name,
        hardship:req.body.hardship,
        level:req.body.level,
        trainer:req.session.userID,
        image:uploadeImage.name//fotograf cekerken basina uploads/image seklinde olucak
    });
    const trainer=await Trainer.findById(req.session.userID);
    await trainer.workout.push({_id:work._id});
    await trainer.save();
    res.redirect("/trainer/add_workout")
    });
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
                    req.session.user=user;
                    res.redirect("/");
                }
            })
        }
    })
  
}
//detail
exports.detailTrainer=async (req,res)=>{
    const trainer=await Trainer.findOne({_id:req.params.id});
    const workout=await Workout.findOne({trainer:req.params.id}).populate('attenders');
    res.render("trainer_detail",{
        page_name:'login',
        trainer:trainer,
        workout:workout
    })
}
//delete
exports.deleteAttender=async (req,res)=>{
    const attender=await Attender.findById(req.body.workout_attender_id);
    await attender.workout.pull({_id:req.body.trainerdelete});
    await attender.save();
    const workout=await Workout.findOne({_id:req.body.trainerdelete});
    workout.attenders.pull({_id:req.body.workout_attender_id});
    await workout.save();
    res.redirect(`/trainer/${req.params.id}`)
}