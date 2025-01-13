import express from "express"
import * as memberC from "../controllers/memberController.js"
       
const router = express.Router()
router.get('/members/logout',memberC.logoutMember)
router.get('/members/getss',memberC.getSession)
router.post('/members',memberC.postMember)
router.post('/members/login',memberC.loginMember)
router.post('/members/uploadImg',memberC.uploadMember)


export default router