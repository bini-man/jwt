const express = require('express')
const app=express()
const mongoose = require('mongoose')
const auth=require('./route/auth')
const postRoute = require('./route/Post')
mongoose.connect('mongodb+srv://bini-man:biniMAN123..@cluster0.tcrqx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
() => console.log('connected to db')
);
const router=require('./route/auth')
app.use(express.json())

app.use('/api/user',router)
app.use('/api/post',postRoute)
app.listen(3000, ()=>{
    console.log("up and running ")
})