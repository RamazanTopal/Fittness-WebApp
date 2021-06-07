const Attender=require('../models/attender');
const bcrypt=require('bcrypt');
//register
exports.getRegister=async (req,res)=>{
    res.render("register_attender",{
        page_name:'login'
    })
}
exports.postRegister=async (req,res)=>{
    await Attender.create(req.body);
    res.redirect("/attender/register_attender")
}
//login
exports.getLogin=async (req,res)=>{
    res.render("login_attender",{
        page_name:'login'
    })
}
exports.postLogin=async (req,res)=>{
    const {email,password}= req.body;
    await Attender.findOne({email},(err,user)=>{
        if(user){
            bcrypt.compare(password,user.password,(err,same)=>{
                if(same){
                    req.session.userID=user._id;
                    req.session.userROLE=null;
                    res.redirect("/");
                }
            })
        }
    })
}