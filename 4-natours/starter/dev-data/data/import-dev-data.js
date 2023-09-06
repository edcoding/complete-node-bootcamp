const fs=require('fs')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config({path:'./config.env'})
const Tour=require('./../../models/tourModel')

const DB='mongodb://127.0.0.1:27017/natours-test'

mongoose.connect(DB,{
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(con=>{
    // console.log(con.connection)
    console.log('DB connection successfull')
})

// Read json file

const tours=JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`,'utf-8'))

//console.log(tours)

// import data into db

const importData=async()=>{
    try{
        await Tour.create(tours)
        process.exit();
    }
    catch(err)
    {
        console.log(err)
    }
}



// delete data from db

const deleteData=async()=>{
    try{
        await Tour.deleteMany()
    }
    catch(err)
    {
        console.log(err)
    }
}
deleteData();

importData()