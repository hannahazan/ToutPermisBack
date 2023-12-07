import  express from 'express'
import multer from "multer"
const routerFicheCouverture= express.Router()
routerFicheCouverture.use(express.json());
routerFicheCouverture.use(express.urlencoded({extended: true}))
import FicheCouverture from '../../Models/ModelEcole/FicheCouvertureModel.js'
import multerS3 from "multer-s3"
import AWS from 'aws-sdk'
import 'dotenv/config'

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
console.log("yes ca marche",s3
)

//fonction qui s'assure que le fichier uploadé est du bon format
const fileFilter=(req,file,cb)=>{
  if(file.mimetype.split("/")[0]==="image"){
    cb(null,true)
  }
  else{
    cb(new Error("file is not of the correct type"),false)
  }
}
//
//const upload = multer({ dest: 'toutpermis-app/public/data/uploads',fileFilter})
/*const storage=multer.memoryStorage()
const upload=multer({
  storage,
  fileFilter
})*/
const upload = 
  multer({
    storage: multerS3({
      s3,
      bucket: process.env.AWS_BUCKET_NAME,
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, `image-${Date.now()}.jpeg`);
      },
    }),
    fileFilter
  });

routerFicheCouverture.post("/", upload.single('file'), async (req, res) => {
    /*const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'tmp/dest')
      },
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + ' -' + Math.rond(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
      },
    })*/
    try {
      let myFicheCouverture= new FicheCouverture({
        EcoleNameId:req.body.EcoleNameId,
        UserPseudo:req.body.UserPseudo,
        //CouvertureUrl: req.file !==null? "https://toutpermisback-production.up.railway.app/toutpermis-app/public/data/uploads/"+ req.file.filename:"",
        CouvertureUrl:req.file.location,
        PictureName:req.file.originalname, 
        idCouv:req.body.idCouv
      });
      await myFicheCouverture.save();
      console.log(req.file)
      console.log(req.body)
      res.json({ message: "Created couv" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  routerFicheCouverture.get('/AvecId/:idCouv', function (req, res) {
    FicheCouverture.findOne({idCouv: req.params.idCouv }, (err, data) => {
       res.send(data)
       console.log(data)
     }
     )
   });
 

  routerFicheCouverture.get('/:EcoleNameId', function (req, res) {
    FicheCouverture.findOne({EcoleNameId: req.params.EcoleNameId }, (err, data) => {
       res.send(data)
       console.log(data)
     }
     )
   });
   routerFicheCouverture.get('/', function (req, res) {
    FicheCouverture.find((err, data) => {
       res.send(data)
       console.log(data)
     }
     )
   });
   routerFicheCouverture.delete('/delete/:_id',(req,res)=>{
    FicheCouverture.findOneAndDelete({_id:req.params._id},function(err,data){
      if(err){
        res.sendStatus(404)
      }
      else
      {
        if (!data){
            res.sendStatus(404)
            }
        else{
            res.send(data)
            }
      }
    })
  })
  export default routerFicheCouverture