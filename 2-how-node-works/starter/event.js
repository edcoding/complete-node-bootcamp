const EventEmitter=require('events')
const http=require('http')


const myEmitter=new EventEmitter();

myEmitter.on('newSale',()=>{
    console.log('there was a new sale')
})

myEmitter.on('newSale',()=>{
    console.log('Costumer name:Jonas')
})

myEmitter.on('newSale',stock=>{
    console.log(`there are now ${stock}`)
})

myEmitter.emit('newSale',9)

//////////////////////////////

const server=http.createServer()

server.on('request',(req,res)=>{
    console.log('request received')
    res.end('request')
})

server.on('request',(req,res)=>{
    console.log('another request received')
    
})

server.on('close',()=>{
    console.log('server closed')
})

server.listen(5000,'127.0.0.1',()=>{
    console.log('waiting for requests')
})


