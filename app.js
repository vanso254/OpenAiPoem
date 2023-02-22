const express = require('express')
const app = express()
const router=require('./routes/router')
const mongoose=require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/OpenAiPoem',{
    useNewUrlParser: true, useUnifiedTopology: true
})

app.use(express.urlencoded({extended:false}))

app.set('view engine','ejs')

app.use('/',router)
app.listen(3000)