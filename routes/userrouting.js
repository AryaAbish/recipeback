//import express
const express=require('express')

//import logic
const logic=require('../controllers/logic')

//create an object for router class in express
const router=new express.Router()

//register
router.post('/user/register',logic.registeruser)

//login
router.post('/user/login',logic.login)

//add recipes
router.post('/admin/addrecipies',logic.addrecipies)

//get all recipies
router.get('/recipies/allrecipies',logic.allrecipies)

//single recipe
router.get('/recipies/singlerecipies/:rname',logic.singlerecipies)

//edit details
router.put('/recipies/edit/:_id',logic.editData)

//delete
router.delete('/recipies/delete/:rname',logic.deleteData)

//viewuser by admin
router.get('/admin/viewuser',logic.viewuser)

//delete user
router.delete('/delete/:uname',logic.deleteuser)

//message admin
router.post('/user/message',logic.messageadmin)

//message seen by admin
router.get('/admin/viewmessage',logic.viewmessage)

//delete msg
router.put('/admin/deletemsg',logic.deletemsg)

//change pswd
router.put('/user/changepsw/:uname',logic.changepswd)

//comment
router.post('/user/comment',logic.comment)

//delete comment
router.put('/deletecomment',logic.deletecomment)

//wishlist
router.post('/user/wishlist',logic.wishlist)

//view wishlist
router.get('/user/viewwishlist/:uname',logic.viewwishlist)

//delete wishlist
router.put('/user/deletewishlist',logic.deletewishlist)

//export router
module.exports=router