const router = require('express').Router()
const User = require('../model/User')
const verify = require('./Verify')
router.get('/',verify,(req,res)=>{
   // res.json({posts:{title: 'my first post',description:'random data you shouldnt access'}})

    User.findById(req.user._id).then(doc => {
        if (!doc) return res.status(404).end();
        return res.stat
        us(200).json(doc)
    })
    // User.find({}, function(err,users){
    //     if(err) res.send("error found")
    //     res.json(users)
    //     }) 
})
module.exports=router;