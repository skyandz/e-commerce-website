import express from "express"
// import database from "./service/database.js";
import dotenv from 'dotenv'
import bodyParser from "body-parser";
import productRoute from "./routes/productRoute.js"
import memberRoute from "./routes/memberRoute.js"
import cartRoute from "./routes/cartRoute.js"
import cors from "cors"
import session from "express-session";

// import ส่วนที่ติดตั้งเข้ามา
import swaggerUI from "swagger-ui-express"
import yaml from "yaml"
// ใช้ File
import fs from "fs"

dotenv.config()
 
const app = express()
// const port = 3000
const port = process.env.PORT
 
app.use(bodyParser.json())

app.use("/img_pd",express.static('img_pd'))
app.use("/img_mem",express.static('img_mem'))

//app.use(cors())
app.use(cors({ origin:['http://localhost',,'http://localhost:8080','http://127.0.0.1:8080'],
    methods: ['GET', 'POST','PUT','DELETE'],
    credentials: true
}))


const thesecret = process.env.SECRET
app.use(session({
    secret: thesecret,
    resave: false,
    saveUninitialized: true
}))

app.use(productRoute)
app.use(memberRoute)
app.use(cartRoute)

// swagger
const swaggerfile = fs.readFileSync('service/swagger.yaml','utf-8')
const swaggerDoc = yaml.parse(swaggerfile)
// กำหนด path ที่จะให้เรียกหน้า Document ขึ้นมา
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDoc))
 
/* app.post('/products',async (req,res)=>{
    console.log(`POST / Products is requested`)
    const bodyData=req.body
    try{
        if(req.body.pdId==null || req.body.pdName==null)
        {
            return res.status(422).json({error:'pdId and pdName is required'})
        }
 
        const existResult = await database.query({
            text:'SELECT EXISTS (SELECT * FROM products WHERE "pdId" = $1)',
            values:[req.body.pdId]
        })
 
        if(existResult.rows[0].exists){
            return res.status(409).json({error:`pdId ${req.body.pdId} is exisis`})
        }
 
        const result = await database.query({
            text: `INSERT INTO products ("pdId", "pdName", "pdPrice", "pdTypeId", "brandId")
                   VALUES ($1,$2,$3,$4,$5)`,
            values:[
                req.body.pdId,
                req.body.pdName,
                req.body.pdPrice,
                req.body.pdTypeId,
                req.body.brandId,
            ]
        })
        const datetime = new Date()
        bodyData.createDate=datetime
        res.status(201).json(bodyData)
    }
    catch(err){
        return res.status(500).json({error:err.message})
    }
   
}) */
 
app.get('/',(req,res)=>{
    console.log(`GET / requested`)
    res.status(200).json({message:"Request OK"})
})


/* app.get('/products',async(req,res)=>{
    console.log(`GET / Products is requested`)
    try{
        const strQry='SELECT * FROM products'
        const result = await database.query(strQry)
        return res.status(200).json(result.rows[3])
    }
    catch(err)
    {
        return res.status(500).json({
            error:err.message
        })
    }
 
}) */
 
app.listen(port,()=>{
    console.log(`Server is running on port:${port}`)
})