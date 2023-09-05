const fs=require('fs')

const tours=JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))

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

exports.checkBody=(req,res,next)=>{

    if(!req.body.name || !req.body.price){
        return res.status(400).json({
            status:'fail',
            message:'invalid'
        })
    }
   next();
}

exports.getAllTours=(req,res)=>{
        console.log(req.requestTime)
        res.status(200).json({
            status:'success',
            requestedAt:req.requestTime,
            result:tours.length,
            data: {
                tours
            }
        })
    
}
exports.getTour=(req,res)=>{
   
        const tour=tours.find(el=>el.id===req.params.id*1)
        res.status(200).json({
            status:'success',
            data:{
                tour
            }
        })
    
}
    
exports.createTour=(req,res)=>{
        console.log(req.body)
        const newId=tours[tours.length-1].id+1;
        const newTour=Object.assign({id:newId},req.body) //joins two json
        tours.push(newTour)
        fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`,JSON.stringify(tours),err=>{
            if(err) return;
            res.status(200).json({
                status:'success',
                data:{
                    tour:newTour
                }
            })
        })
        
}
    
exports.updateTour=(req,res)=>{
    
     
        res.status(200).json({
            status:'success',
            data:{
                tour:'<Updates tour here ...'
            }
        })
}
    
exports.deleteTour=(req,res)=>{
    
        
        res.status(204).json({
            status:'success',
            data:null
        })
    }
  