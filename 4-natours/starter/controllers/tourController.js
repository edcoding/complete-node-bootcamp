// const fs=require('fs')
const Tour=require('./../models/tourModel')

// const tours=JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))

exports.checkID=(req,res,next)=>{
    const id =req.params.id*1;
    
    if(id>tours.length){
        return res.status(404).json({
            status:'fail',
             message:'Invalid ID'
        })
    }
    next();
}

// exports.checkBody=(req,res,next)=>{

//     if(!req.body.name || !req.body.price){
//         return res.status(400).json({
//             status:'fail',
//             message:'invalid'
//         })
//     }
//    next();
// } 





exports.getAllTours=async (req,res)=>{

    try {

        const queryObject={...req.query}
      
        const excludedFields=['page','sort','limit','fields']
        excludedFields.forEach(el=>delete queryObject[el]) // diagrafei ta stoixeia pou exoume sto excludedFileds
        // 1 solution filtering with query
        // const tours=await Tour.find({
        //     duration:5,
        //     difficulty:'easy'
        // });
        //2 solution
          //const tours=await Tour.find().where('duration').equals(5).where(difficulty).equals('easy');

        // 3 solution
         //const query=await Tour.find(queryObject );

        // execute query
       // const tours=await query;
        
        /// advanced filtering
          let queryStr=JSON.stringify(queryObject)
         // console.log( queryStr);

         queryStr= queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match=>`$${match}`)

        // console.log( queryStr);
          let query=Tour.find(JSON.parse(queryStr))
      
         // sorting
         if(req.query.sort){
            const sortBy=req.query.sort.split(',').join(' ')
           // query=query.sort(req.query.sort)
           query=query.sort(sortBy) //multiple sorts
            // sort('price ratingsAverage')
         }
         else{
            query=query.sort('-createdAt')
         }

         // field limiting

         if(req.query.fields){
            const fields=req.query.fields.split(',').join(' ');
            query=query.select(fields)
         }
         else {
            query=query.select('-__v')
         }

         // pagination
         const page=req.query.page * 1 || 1
         const limit =req.query.limit * 1 || 100;
         const skip=(page-1)*limit;
         query=query.skip(skip).limit(limit)
         if(req.query.page){
            const numTours=await Tour.countDocuments()
            if(skip>numTours) throw Error('this page does not exist')
         }
         const tours=await query

        /// send response
        res.status(200).json({
               status:'success',
               result:tours.length,
               data: {
                   tours
               }
     })
    }
    catch(err) {
        res.status(400).json({
            status:'fail',
            message:'Invalid data send'
        })
     }
   
        // console.log(req.requestTime)
        // res.status(200).json({
        //     status:'success',
        //     requestedAt:req.requestTime,
            // result:tours.length,
            // data: {
            //     tours
            // }
        // })
    
}
exports.getTour=async(req,res)=>{

    try {
        const tours=await Tour.findById(req.params.id);
        //tour.findOne({_id:req.params.id})

        res.status(200).json({
               status:'success',
               result:tours.length,
               data: {
                   tours
               }
     })
    }
    catch(err) {
        res.status(400).json({
            status:'fail',
            message:'Invalid data send'
        })
     }
   
        // const tour=tours.find(el=>el.id===req.params.id*1)
        // res.status(200).json({
        //     status:'success',
        //     data:{
        //         tour
        //     }
        // })
    
}
    
exports.createTour=async(req,res)=>{
    try{
        const newTour = await Tour.create(req.body)  
        res.status(200).json({
           status:'success',
           tour:newTour
        })
    }
     catch(err) {
        res.status(400).json({
            status:'fail',
            message:err
        })
     }
}
    
exports.updateTour=async(req,res)=>{
    
    try {
        const tours=await Tour.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        });
       

        res.status(200).json({
            status:'success',
                data:{
                    tour:'<Updates tour here ...'
                }
     })
    }
    catch(err) {
        res.status(400).json({
            status:'fail',
            message:'Invalid data send'
        })
     }
     
        // res.status(200).json({
        //     status:'success',
        //     data:{
        //         tour:'<Updates tour here ...'
        //     }
        // })
}
    
exports.deleteTour=async(req,res)=>{
    
        
    try {
        const tours=await Tour.findByIdAndDelete(req.params.id)
       

        res.status(200).json({
            status:'success',
                data:{
                    tour:'<Updates tour here ...'
                }
     })
    }
    catch(err) {
        res.status(400).json({
            status:'fail',
            message:'Invalid data send'
        })
     }
        // res.status(204).json({
        //     status:'success',
        //     data:null
        // })
    }
  