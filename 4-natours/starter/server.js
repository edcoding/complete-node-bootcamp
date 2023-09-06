const mongoose=require('mongoose')

const dotenv=require('dotenv')
dotenv.config({path:'./config.env'})

const app=require('./app')

const DB=process.env.DATABASE

mongoose.connect(DB,{
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(con=>{
    // console.log(con.connection)
    console.log('DB connection successfull')
})

// test and insert data
// const testTour=new Tour({
//     name:'The forest hiker',
//     rating:4.7,
//     price:20
// })

// testTour.save().then((doc)=>{
//     console.log(doc)
// }).catch((err)=>{
//     console.log(err)
// })

const port=process.env.PORT ||  3000
app.listen(port,()=>{
    console.log('app running')
})