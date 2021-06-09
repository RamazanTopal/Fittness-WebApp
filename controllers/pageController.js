const Workout=require('../models/workouts');
const Trainer=require('../models/trainer');
const Attender=require('../models/attender');
const nodemailer=require('nodemailer');
exports.getIndex=async (req,res)=>{
    const workout=await Workout.find();
    const trainer=await Trainer.find();
    res.render("index",{
        page_name:'index',
        workout:workout,
        trainer:trainer
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
exports.sendEmail=async (req,res)=>{
    const outputMessage=`
    <h1>Mail Detail</h1>
    <ul>
        <li>${req.body.name}</li>
        <li>${req.body.email}</li>
    </ul>
    <h1>Message</h1>
    <p>${req.body.message}</p>
    `;
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: "gmailadresi", // gmail 
          pass: "password", // gmail password
        },
      });
        // send mail with defined transport object
    let info = await transporter.sendMail({
            from: `"Fitness Web Application" <${req.body.email}>`, // sender address
            to: "receiver@example.com", // list of receivers
            subject: "Fitness Question", // Subject line
            text: `${req.body.message}`, // plain text body
            html: outputMessage, // html body
    });
    res.redirect('/contact');
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
    if(!userROLE){
        const workout=await Workout.find();
        const attender=await Attender.findOne({_id:req.session.userID})
        res.render("service",{
            page_name:'service',
            workout:workout,
            attender:attender
        })
    }
    else{
        const workout=await Workout.find();
        
        res.render("service",{
            page_name:'service',
            workout:workout
        })
    }
  
}
exports.getDetailService=async (req,res)=>{
    const workout=await Workout.findOne({_id:req.params.id})
    res.render('service_detail',{
        workout:workout,
        page_name:'service'
    })
}
exports.cancelService=async (req,res)=>{
    const work=await Workout.findOne({_id:req.params.id});
    const attender=await Attender.findById(req.session.userID);
    await work.attenders.pull({_id:attender._id});
    await work.save();
    await attender.workout.pull({_id:req.params.id});
    await attender.save();
    res.redirect('/service')
}
exports.takeService=async (req,res)=>{
    const work=await Workout.findOne({_id:req.params.id});
    const attender=await Attender.findById(req.session.userID);
    await work.attenders.push({_id:attender._id});
    await work.save();
    await attender.workout.push({_id:req.params.id});
    await attender.save();
    res.redirect("/service")
}
//service finish
exports.getTrainer=async (req,res)=>{
    const trainer=await Trainer.find();
    res.render("trainer",{
        page_name:'trainer',
        trainer:trainer
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