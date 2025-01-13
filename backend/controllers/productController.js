import database from "../service/database.js";

export async function getProductByBrandId(req,res){
    console.log(`GET /products/${req.params.id} is requested`)
    try{
        // const strQry= `SELECT * FROM products ORDER BY "pdId"`
        const result = await database.query({
            text:`
            SELECT	p.*,(
                SELECT row_to_json(brand_obj) 
                FROM (
                    SELECT "brandId", "brandName" FROM brands
                    WHERE "brandId" = p."brandId"
                )brand_obj
            ) AS brand
            FROM	products p 
            WHERE p."brandId" ILIKE $1`, 
            values:[req.params.id]
        })
        return res.status(200).json(result.rows)
    }
    catch(err)
    {
        return res.status(500).json({
            error:err.message
        })
    }
}

export async function deleteProduct(req,res){
    console.log(`DELETE /products/${req.params.id} is requested`)
    try {
        const result = await database.query({
            text:`DELETE FROM "products" WHERE "pdId" = $1`,
            values:[req.params.id]
        })
        res.status(204).end()
    } catch(err){
            return res.status(500).json({error:err.message})
    }
}

export async function putProduct(req,res){
    console.log(`PUT /products/${req.params.id} is requested`)
    const bodyData=req.body
    const result = await database.query({
        text: `UPDATE "public"."products" 
                SET "pdId"=$1, 
                    "pdName"=$2, 
                    "pdPrice"=$3, 
                    "pdRemark"=$4, 
                    "pdTypeId"=$5, 
                    "brandId"=$6
                WHERE "pdId"=$7`,
        values:[
            req.body.pdId,
            req.body.pdName,
            req.body.pdRemark,
            req.body.pdPrice,
            req.body.pdTypeId,
            req.body.brandId,
            req.params.id
        ]
    })
    const datetime = new Date()
    bodyData.createDate=datetime
    res.status(201).json(bodyData)
}

export async function getProductById(req,res){
    console.log(`GET /products/${req.params.id} is requested`)
    try{
        // const strQry= `SELECT * FROM products ORDER BY "pdId"`
        const result = await database.query({
            text:`
            SELECT	p.*,(
                SELECT row_to_json(brand_obj) 
                FROM (
                    SELECT "brandId", "brandName" FROM brands
                    WHERE "brandId" = p."brandId"
                )brand_obj
            ) AS brand
            FROM	products p 
            WHERE p."pdId" ILIKE $1`, 
            values:[req.params.id]
        })
        return res.status(200).json(result.rows)
    }
    catch(err)
    {
        return res.status(500).json({
            error:err.message
        })
    }
}

export async function getAllProduct(req,res){
    console.log(`GET /products is requested`)
    try{
        // const strQry= `SELECT * FROM products ORDER BY "pdId"`
        const result = await database.query(`
            SELECT	p.*,(
                SELECT row_to_json(brand_obj) 
                FROM (
                    SELECT "brandId", "brandName" FROM brands
                    WHERE "brandId" = p."brandId"
                )brand_obj
            ) AS brand
            FROM	products p 
        `)
        return res.status(200).json(result.rows)
    }
    catch(err)
    {
        return res.status(500).json({
            error:err.message
        })
    }
}

export async function postProduct(req,res){
    console.log(`POST /products is requested`)
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
}

export async function getTenProduct(req,res){
    console.log(`GET /products/ten is requested`)
    try{
        // const strQry= `SELECT * FROM products ORDER BY "pdId"`
        const result = await database.query(`
            SELECT	p.*,(
                SELECT row_to_json(brand_obj) 
                FROM (
                    SELECT "brandId", "brandName" FROM brands
                    WHERE "brandId" = p."brandId"
                )brand_obj
            ) AS brand
            FROM	products p 
            LIMIT 10
        `)
        return res.status(200).json(result.rows)
    }
    catch(err)
    {
        return res.status(500).json({
            error:err.message
        })
    }
}

export async function getSearchProduct(req,res){
    console.log(`GET /products/search is requested`)
    try{
        // const strQry= `SELECT * FROM products ORDER BY "pdId"`
        const result = await database.query({
            text:`
            SELECT	p.*,(
                SELECT row_to_json(brand_obj) 
                FROM (
                    SELECT "brandId", "brandName" FROM brands
                    WHERE "brandId" = p."brandId"
                )brand_obj
            ) AS brand
            FROM	products p 
            WHERE (     p."pdId" ILIKE $1
                    OR  p."pdName" ILIKE $1
                    OR  p."pdRemark" ILIKE $1
            )
            LIMIT 3
            `, 
            values:[`%${req.params.id}%`]
        })
        return res.status(200).json(result.rows)
    }
    catch(err)
    {
        return res.status(500).json({
            error:err.message
        })
    }
}