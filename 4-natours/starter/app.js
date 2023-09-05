const express=require('express')

const morgan=require('morgan')
const app=express();

const tourRouter=require('./routes/tourRoutes')
const userRouter=require('./routes/userRoutes')



 // middleware
app.use(express.json()) 
if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'));
}

app.use(express.static(`${__dirname}/public`))

//myown middleware

app.use((req,res,next)=>{
    console.log('hello from the middleware')
    next();
})

app.use((req,res,next)=>{
    req.requestTime=new Date().toISOString();
    next();
})


// app.get('/',(req,res)=>{
//     res.status(200).json({message:'hello',app:'heyy'})
// })

// app.post('/',(req,res)=>{
//     res.send('you can post to this url')
// })

// app.get('/api/v1/tours',getAllTours)
// app.get('/api/v1/tours/:id',getTour)
// app.post('/api/v1/tours',createTour)
// app.patch('/api/v1/tours/:id',updateTour)
// app.delete('/api/v1/tours/:id',deleteTour)

// routes
app.use('/api/v1/tours',tourRouter)
app.use('/api/v1/users',userRouter)

module.exports=app;