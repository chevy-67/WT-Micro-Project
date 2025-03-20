const express = require('express')
const app = express()
const port = 9090

app.get('/login',(req,res)=>{
    res.setHeader('Content-Type','text/plain')
    let username = req.query.username ? req.query.username.trim() : "";
    let pass = req.query.pass ? req.query.pass.trim() : "";
    if(username==="" || pass===""){
        return res.send('Please ENter valid creds')
    }
    //TO BE IMPLEMENTED
    res.send('Login success :)')
})

app.get('/signup',(req,res)=>{
    res.setHeader('Content-Type','text/plain')
    let username = req.query.username ? req.query.username.trim() : "";
    let pass = req.query.pass ? req.query.pass.trim() : "";
    if(username==="" || pass===""){
        return res.send('Please ENter valid creds')
    }
    //TO BE STORED IN DATABASE
    res.send('Account created successfully')
})
app.listen(port,()=>{
    console.log('Server listening at port : '+port)
})