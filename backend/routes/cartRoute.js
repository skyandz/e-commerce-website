import express from "express"
import * as cartC from "../controllers/cartController.js"
       
const router = express.Router()
router.get('/carts/chkcart',cartC.chkCart)
router.post('/carts/addcart',cartC.postCart)
router.post('/carts/addcartdtl',cartC.postCartDtl)
router.get('/carts/sumcart',cartC.sumCart)
router.post('/carts/getcartbycus',cartC.getCartByCus)
router.get('/carts/getcart/:id',cartC.getCart)
router.get('/carts/getcartdtl/:id',cartC.getCartDtl)
router.get('/carts/deleteCart/:id',cartC.deleteCart)
router.put('/carts/updateCf/:id',cartC.updateCf)


export default router