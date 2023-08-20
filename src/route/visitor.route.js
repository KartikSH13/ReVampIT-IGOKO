import express from "express"
import {saveVisitor,showVisitors,showCountryData,monthlyVisitor,oneDayData} from '../controller/visitor.controller.js'
const router=express.Router();
router.get('/show/visitors',showVisitors)
router.get('/show/countryData',showCountryData)
router.get('/show/monthlyData',monthlyVisitor)
router.get('/show/oneDayData',oneDayData)
router.post('/save/:page',saveVisitor)
export default router;