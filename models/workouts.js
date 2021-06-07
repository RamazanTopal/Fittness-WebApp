const mongoose=require('mongoose');

const workoutSchema=mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    hardship:{
        type:String,
        require:true
    },
    image:{
        type:String,
        default:"images/service1.jpg"
    }
})

const workout=mongoose.model('Workout',workoutSchema);
module.exports=workout;