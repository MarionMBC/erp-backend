import express from "express";

export const app = express();


//MiddleWare
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'))


//Routes

/**
* * const xRoute = require ('../routes/routeName') 
* ! app.use ('/routeName', xRoute)
*/





app.get( '/',(req, res)=> {
    res.status(200).json({
        status: 200,
        msg: "Bienvenido al servidor de SyncPro."
    })
})

