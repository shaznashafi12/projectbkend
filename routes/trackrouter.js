import express from 'express'
import { createtrack, gettrack } from '../controller/trackcontroller.js'

const trackrouter=express.Router()

trackrouter.post('/createtrack',createtrack)
trackrouter.get('/gettrack',gettrack)

export default trackrouter;