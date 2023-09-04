const fs=require('fs')
const http=require('http')
const url=require('url')

const slugify=require('slugify')

const replaceTemplate=require('./modules/replaceTemplate')

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




const tempOverview=fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8')
const tempCard=fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8')
const tempProduct=fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8')

const data=fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8')
const dataObj=JSON.parse(data)

const slugs=dataObj.map(el=>{
    console.log(slugify(el.productName,{lower:true}))
})



const server=http.createServer((req,res)=>{
    //const pathName=req.url
    const {query, pathname} =url.parse(req.url,true)

    // overview page
    if(pathname === '/overview' || pathname==='/'){
        res.writeHead(200,{'Content-type':'text/html'})
        
        const cardsHtml=dataObj.map(el=>replaceTemplate(tempCard,el)).join('')
        const output=tempOverview.replace('{%PRODUCT_CARDS%}',cardsHtml)
        res.end(output)
    }
    // product page
    else if(pathname === '/product'){
        res.writeHead(200,{'Content-type':'text/html'})
        const obj=dataObj[query.id]
        const output1=replaceTemplate(tempProduct,obj)
        res.end(output1)
    }

    //API
    else if(pathname === '/api'){
       res.writeHead(200,{'Content-type':'application/json'})
        res.end(data)
    }
    // not found
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

