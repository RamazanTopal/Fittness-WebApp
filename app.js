const express=require('express');
const mongoose=require('mongoose');
const session = require('express-session');
const methodOverride = require('method-override');
const MongoStore = require('connect-mongo');
const app=express();


//Routes
const pageRoute=require('./routes/pageRoute');
const trainerRoute=require('./routes/trainerRoute');
const attenderRoute=require('./routes/attenderRoute');
//session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost/FitnessApp' })
  }))

//middleware
app.use(express.static("public"));
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.json());
//global variable
global.userIN=null;
global.userROLE=null;
//method-override
app.use(methodOverride('_method',{
  methods:['POST','GET']
}))
//mongoose
mongoose.connect('mongodb://localhost/FitnessApp',
 {
   useNewUrlParser: true, 
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex:true

});
//route
app.use('*',(req,res,next)=>{
  userIN=req.session.userID;
  userROLE=req.session.userROLE;
  next();
})
app.use("/",pageRoute)
app.use("/trainer",trainerRoute)
app.use("/attender",attenderRoute)





app.listen(3000,()=>{
    console.log("Web server listening 3000 port");
})