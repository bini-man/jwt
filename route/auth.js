const router = require('express').Router()
const User = require('../model/User');
const bcrypt= require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
// const Joi= require('@hapi/joi')
// const schema = {
//     name: Joi.string().min(6).required(),
//     email: Joi.string().min(6).required().email(),
//     password: Joi.string().min(6).required()
// }
router.post('/register', async (req,res)=>{
    // const {error} = Joi.Validate(req.body,schema);
    // if (error) return res.status(400).send(error.detaild[0].message)
    const emailExists = await User.findOne({email: req.body.email});
  if(emailExists) return res.status(400).send('email already exists')
  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(req.body.password,salt);

  try {
         const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:hashPassword
    })
      const savedUser = await user.save()
      res.send(savedUser) 
   } catch(err) {
       res.send(err)
   }
})
router.post('/login',async (req,res)=>{
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('email not exists')
    const validPass = await bcrypt.compare(req.body.password,user.password)
    if(!validPass) return res.status(400).send('Invalid password')
    const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET)
    res.header('auth-token',token).send(token);
})
module.exports=router