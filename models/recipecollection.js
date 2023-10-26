const mongoose=require('mongoose')


const recipies=new mongoose.model("recipies",{
    rname:String,
    no:String,
    dur:String,
    des:String,
    img:String,
    cat:String,
    comment:[]
})

// const comments=new mongoose.model("comments",{
//     rname:String,
//     uname:String,
//     comment:[]
// })

module.exports=recipies