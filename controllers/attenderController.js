const Attender=require('../models/attender');
const bcrypt=require('bcrypt');
//register
exports.getRegister=async (req,res)=>{
    res.render("register_attender",{
        page_name:'login'
    })
}
exports.postRegister=async (req,res)=>{
    let uploadeImage = req.files.image;
    let uploadPath = __dirname + '/../public/uploads/' + uploadeImage.name;
    uploadeImage.mv(uploadPath, async () => {
    
    const work=await Attender.create({
        name:req.body.name,
        surname:req.body.surname,
        email:req.body.email,
        password:req.body.password,
        level:req.body.level,
        image:uploadeImage.name//fotograf cekerken basina uploads/image seklinde olucak
    });
    res.redirect("/attender/login_attender")
    });
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
                    req.session.user=user;
                    res.redirect("/");
                }
            })
        }
    })
}