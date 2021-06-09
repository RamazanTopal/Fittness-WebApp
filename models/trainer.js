const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const trainerSchema=mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    surname:{
        type:String,
        require:true
    },
    password:{
        type:String
    },
    email:{
        type:String
    }
    ,
    image:{
      type:String
    },
    role:{
        type:String
    },
    workout:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Workout"
    }]
})
trainerSchema.pre('save', async function (next) {
    // check if password is present and is modified.
    try {
      if (this.password && this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
      }
      next();
    } catch (err) {
      next(err);
    }
  });
const trainer=mongoose.model('Trainer',trainerSchema);
module.exports=trainer;