import express from "express";
import { json } from "express";
import multer from "multer"
import  uuidv4 from 'uuidv4'
const pictureRoute= express.Router()
pictureRoute.use(express.json());
pictureRoute.use(express.urlencoded({extended: true}))
import Pictures from "../Pictures.js";
import { readFile } from 'fs/promises';
const dockJson = JSON.parse(
  await readFile(
    new URL('../PicturesTest.json', import.meta.url)
  )
);
const upload = multer({ dest: 'toutpermis-app/public/data/uploads' })

pictureRoute.get('/', function (req, res) {
    dockJson.find((err, data) => {
       res.send(dockJson)
     })
   })
  

export default pictureRoute