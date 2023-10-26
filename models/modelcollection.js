const mongoose=require('mongoose')

const register=new mongoose.model("register",{
    uname:String,
    psw:String,
    message:[],
    saved:[]
    // blocked:String
})

module.exports=register