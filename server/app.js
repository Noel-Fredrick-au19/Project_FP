const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = 5000
const cors = require('cors')
bodyParser = require('body-parser');
const api = require('../server/Routes/user.routes')
const {MONGOURI} = require('./keys')
// const multer = require('multer')
// const cloudinary = require('cloudinary')


mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
mongoose.connection.on('connected',()=>{
    console.log('connected to mongo db')
})
mongoose.connection.on('error',(err)=>{
    console.log('Error connecting',err)
})


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());
app.use('/public', express.static('public'));
app.use('/api', api)



require ('./modes/employee')
// require ('./modes/post')

app.use(express.json())
app.use(require('./Routes/auth'))
// app.use(require('./Routes/post'))



app.listen(PORT,()=>{
    console.log('server is running on PORT', PORT)
}) 


app.use((req, res, next) => {
    // Error goes via `next()` method
    setImmediate(() => {
        next(new Error('Something went wrong'));
    });
});
app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});


