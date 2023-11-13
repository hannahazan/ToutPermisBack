import express from "express";
import multer from "multer"
import  uuidv4 from 'uuidv4'
const pictureRoute= express.Router()
pictureRoute.use(express.json());
pictureRoute.use(express.urlencoded({extended: true}))
import Pictures from "../Pictures.js";

const upload = multer({ dest: 'toutpermis-app/public/data/uploads' })

pictureRoute.get('/', function (req, res) {
    Pictures.find((err, data) => {
       res.send("hello world")
       console.log(data)   
     })
   })
  

export default pictureRoute