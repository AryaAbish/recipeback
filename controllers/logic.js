

//import model
const register = require("../models/modelcollection")
const recipies = require("../models/recipecollection")
// const comments = require("../models/recipecollection")


const registeruser=(req,res)=>{
     // res.send("get request response...")

    const uname=req.body.uname
    const psw=req.body.psw

    register.findOne({uname}).then(user=>{
        if(user){
            res.status(401).json("user exist")
        }
        else{
            var newUser= new register({
                uname,psw
            })
            newUser.save()
            res.json(newUser)
        }
    })
}

const login=(req,res)=>{
    const {uname,psw}=req.body
    register.findOne({uname,psw}).then(user=>{
        if(user){
            res.status(200).json(user)
        }
        else{
            res.status(401).json("Invalid details")

        }
    })
}

const addrecipies=(req,res)=>{
    const {rname,no,dur,des,img,cat}=req.body
    recipies.findOne({rname,no}).then(name=>{
        if(name){
            res.status(401).json("Already added")
        }
        else{
            var newrecipie=new recipies({
                rname,no,dur,des,img,cat
              })
            newrecipie.save()
            res.json(newrecipie)
        }
    })
}

const allrecipies=(req,res)=>{
     recipies.find({recipies}).then(data=>{
        // console.log(data);
        // data=data.map(i=>i.rname)
        if(data){
            res.status(200).json(data)
        }
        else{
            res.status(401).json("error")
        }
     })  
}

const singlerecipies=(req,res)=>{
    const {rname}=req.params
    recipies.findOne({rname}).then(data=>{
        if(data){
            res.status(200).json(data)
        }
        else{
            res.status(401).json("data not exist")
        }
    })
}

const editData=(req,res)=>{
    const{_id}=req.params
    // console.log(_id);
    // const{rname}=req.params
    const {rname,no,dur,des,img,cat}=req.body
    recipies.findOneAndUpdate({_id},{$set:{rname,no,dur,des,img,cat}},{new:true}).then(data=>{
        if(data){
            res.status(200).json(data)
        }
        else{
            res.status(401).json("data not exist")
        }
    })
}

//delete
const deleteData=(req,res)=>{
        const{rname}=req.params
        recipies.deleteOne({rname}).then(data=>{
            if(data){
                res.status(200).json("Account Deleted")
            }
            else{
                res.status(401).json("Not exist")
            }
        })
    }

const viewuser=(req,res)=>{
    register.find({register}).then(data=>{
        // console.log(data);
        if(data){
            res.status(200).json(
                data.map(i=>i.uname)
                )
        }
        else{
            res.status(401).json("error")
        }
    })
}


//delete user by admin
const deleteuser=(req,res)=>{
    const {uname}=req.params
    register.deleteOne({uname}).then(data=>{
        // console.log(data);
        if(data){
            res.status(200).json("Account Deleted")
        }
        else{
            res.status(401).json("Not exist")
        }
    })
}

//message
const messageadmin=(req,res)=>{
    const {uname,messageuser}=req.body
    // console.log(message);
    register.findOne({uname}).then(data=>{
        if(data){
            data.message.push({messageuser,uname})
            data.save()
            res.status(200).json("Message Sent Successfully")
        }
        else{
            res.status(401).json("Message not Send")
        }
    })
}

const viewmessage=(req,res)=>{
    register.find({}).then(data=>{
        if(data){
            res.status(200).json(data.map(i=>i.message).flat().reverse())
        }
        else{
            res.status(401).json("No message found")
        }
    })
}

// //delete msg
const deletemsg=(req,res)=>{
    const {uname,messageuser}=req.body
        register.updateOne(
            {uname},
            { $pull:{message:{messageuser:messageuser,uname:uname}}},
            {multi:true}
        ).then(data=>{
                res.status(200).json("Successfully deleted")
    })
    }


//change pswd
const changepswd=(req,res)=>{
    const {uname}=req.params
    const {psw}=req.body
    const newpsw=req.body.newpsw

    register.findOne({uname}).then(data=>{
            if(data){
                if(data.psw==psw){
                    register.findOneAndUpdate({uname},{$set:{psw:newpsw}},{new:true}).then(data=>{
                        res.status(200).json("Password Changed")
                    })
                }
                else{
                    res.status(200).json("Incorrect password")
                }
            }
            else{
                res.status(401).json("User Not found")
            }
})
}

//comment
const comment=(req,res)=>{
    const {rname,comment,uname}=req.body
    recipies.findOne({rname}).then(data=>{
        if(data){
            data.comment.push({comment,uname})
            data.save()
            res.status(200).json(data)
        }
        else{
            res.status(200).json("Not found")
        }
    })
}


//delete comment         cid
const deletecomment=(req,res)=>{
    const {comment,uname,rname}=req.body 
    recipies.updateOne(
        {rname},
        { $pull: { comment: { uname: uname, comment:comment} } },
        { multi: true }
     ).then(data=>{
            res.status(200).json(data)
    })
}

const wishlist=(req,res)=>{
    const{uname,rname,img}=req.body
register.findOne({uname,saved:{rname:rname,img:img}}).then(data=>{
    if(data){
        res.status(401).json("Already In Wishlist")
    }
   else{
    register.findOne({uname}).then(data=>{
        data.saved.push({rname,img})
        data.save()
        res.status(200).json("Added to wishlist")
    })
   }  
})      
}

//view wishlist
const viewwishlist=(req,res)=>{
    const {uname}=req.params
    register.findOne({uname}).then(data=>{
        if(data){
            res.status(200).json(data.saved)
        }
        else{
            res.status(401).json("Not found")
        }
    })
}

//delete from wishlist
const deletewishlist=(req,res)=>{
    const {uname,rname}=req.body
    register.updateOne(
        {uname},
        {$pull:{saved:{rname:rname}}},
        {multi:true}
    ).then(data=>{
        res.status(200).json(data)
    })
}



module.exports={registeruser,login,addrecipies,allrecipies,singlerecipies,editData,
                deleteData,viewuser,deleteuser,messageadmin,viewmessage,changepswd,
                comment,deletecomment,deletemsg,wishlist,viewwishlist,deletewishlist}
