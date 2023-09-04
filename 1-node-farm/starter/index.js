const fs=require('fs')
const http=require('http')
const url=require('url')

////////////////
// ------    FILES --------

// Blocking, synchronous way

// const textIn=fs.readFileSync('./txt/input.txt','utf-8')
// console.log(textIn)

// const textOut=`this is what we know about the avocado ${textIn}\nCreated on ${Date.now()}`

// fs.writeFileSync('./txt/output.txt',textOut)

// console.log('File Written')


//Non-blocking, asynchronous way

// fs.readFile('./txt/start.txt','utf-8',(err,data)=>{
//     console.log(data)
//     fs.readFile(`./txt/${data}.txt`,'utf-8',(err,data1)=>{
//         fs.readFile(`./txt/append.txt`,'utf-8',(err,data2)=>{
//             console.log(data2)

//             fs.writeFile('./txt/final.txt',`${data1}\n${data2}`,'utf-8',err=>{
//                 console.log('file has been written')
//             })
//         })
//     })
// })

/////////////////
// ------ SERVER -----

const data=fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8')
const dataObj=JSON.parse(data)



const server=http.createServer((req,res)=>{
    const pathName=req.url

    if(pathName === '/overview' || pathName==='/'){
        res.end('this is the overview')
    }
    else if(pathName === '/product'){
        res.end('this is the product')
    }
    else if(pathName === '/api'){
       res.writeHead(200,{'Content-type':'application/json'})
        res.end(data)
    }
    else{
        res.writeHead(404,{
            'Content-type':'text/html'
        })
        res.end('<h1>page not found</h1>')
    }
    
})

server.listen(5000,'127.0.0.1',()=>{
    console.log('Kistening to requests on port 5000')
})
