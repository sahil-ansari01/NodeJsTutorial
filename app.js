const express = require('express');

const app = express();

app.use( (req, res, next) => {
    console.log("In the middleware!");
    next();  // this allows the code to pass to next line/content of this page
})

app.use( (req, res, next) => {
    console.log("In another the middleware!");
    res.send('<h1>Hello from Express!</h1>')
})

app.listen(3000);