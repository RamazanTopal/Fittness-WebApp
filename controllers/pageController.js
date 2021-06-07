const Workout=require('../models/workouts');
const Trainer=require('../models/trainer');
exports.getIndex=async (req,res)=>{
    res.render("index",{
        page_name:'index'
    })
}

exports.getAbout=async (req,res)=>{
    res.render("about",{
        page_name:'about'
    })
}

exports.getContact=async (req,res)=>{
    res.render("contact",{
        page_name:'contact'
    })
}

exports.getGalery=async (req,res)=>{
    res.render("gallery",{
        page_name:'gallery'
    })
}
//service
exports.deleteService=async (req,res)=>{
    await Workout.findOneAndRemove({_id:req.params.id});
    const trainer=await Trainer.findById(req.session.userID);
    await trainer.workout.pull({_id:req.params.id});
    await trainer.save();
    res.redirect('/service')
}
exports.putService=async (req,res)=>{
    const workout=await Workout.findOne({_id:req.params.id})
    workout.name=req.body.name;
    workout.hardship=req.body.hardship;
    workout.save();
    res.redirect('/service')
}
exports.getService=async (req,res)=>{
    const workout=await Workout.find();
    res.render("service",{
        page_name:'service',
        workout:workout
    })
}

exports.getTrainer=async (req,res)=>{
    res.render("trainer",{
        page_name:'trainer'
    })
}
exports.getLogin=async (req,res)=>{
    res.render("login",{
        page_name:'login'
    })
}
exports.getLogout=async (req,res)=>{
    req.session.destroy();
    res.redirect('/');
}