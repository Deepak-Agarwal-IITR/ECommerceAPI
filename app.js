const express = require('express');
const app = express();
const ExpressError = require('./utils/ExpressError');
const bodyParser = require('body-parser')
const fs = require('fs');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.raw())

app.get('/storeinfo',(req,res)=>{
    data = [
        {
            name: "s1",
            address: "s1a",
            id: 1
        },{
            name: "s2",
            address: "s2",
            id: 2
        }
    ]
    res.json(data);
})

app.get('/productinfo',(req,res)=>{
    data = [
        {
            name: "p1",
            storeId: 1,
            price:"12.20",
            id: 1
        },{
            name: "p2",
            storeId: 2,
            price:"10.20",
            id: 2
        }
    ]
    res.json(data);
})

app.post('/orderDone', (req,res)=>{
    const order = req.body;
    const jsonData = JSON.stringify(order)
    fs.writeFile("order.json", jsonData, function(err) {
        if (err) {
            console.log(err);
        }
    });
    res.send(order);
})


app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
})
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something went wrong';
    res.status(statusCode).send('error',{err});
})

app.listen(8080, () => {
    console.log("Listening on 8080")
})