const fs=require('fs')
const { resolve } = require('path')
const superagent=require('superagent')

const  readFilePro = file => {
    return  new Promise((resolve,reject)=>{
        fs.readFile(file,(err,data)=>{
            if(err) reject('i could not find that file')
            resolve(data)
        })
    });
}

const writeFilePro=(file,data)=>{
    return  new Promise((resolve,reject)=>{
        fs.writeFile(file,data,err =>{
            if(err) reject('i could not write that file')
            resolve('success')
        })
    });
}

readFilePro(`${__dirname}/dog.txt`).then(data=>{

    console.log(`${data}`)

    superagent.get(`https://dog.ceo/api/breed/${data}/images/random`).end((err,res)=>{
        console.log(res.body)
        if(err) console.log(err.message)
        
        fs.writeFile('dog-img.txt',res.body.message,err=>{
            console.log('image saved')
        })
    })

})

// const url=fs.readFile(`${__dirname}/dog.txt`,(err,data)=>{
//     console.log(`${data}`)

//     superagent.get(`https://dog.ceo/api/breed/${data}/images/random`).end((err,res)=>{
//         console.log(res.body)
//         if(err) console.log(err.message)
        
//         fs.writeFile('dog-img.txt',res.body.message,err=>{
//             console.log('image saved')
//         })
//     })
// })




