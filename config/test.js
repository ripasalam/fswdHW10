const pool = require('./db.config')

pool.connect((err,res)=>{
    if (err) {
        console.log(err)
    } else{
        console.log("connected")
    }
})