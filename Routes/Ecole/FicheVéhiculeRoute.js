import  express from 'express'
import multer from "multer"
import  uuidv4 from 'uuidv4'
const routerFicheVéhicule= express.Router()
routerFicheVéhicule.use(express.json());
routerFicheVéhicule.use(express.urlencoded({extended: true}))
import FicheVéhicule from '../../Models/ModelEcole/FicheVéhiculeModel.js';
import multerS3 from "multer-s3"
import AWS from 'aws-sdk'
import 'dotenv/config'


//const upload = multer({ dest: 'toutpermis-app/public/data/uploads' })

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

//fonction qui s'assure que le fichier uploadé est du bon format
const fileFilter=(req,file,cb)=>{
  if(file.mimetype.split("/")[0]==="image"){
    cb(null,true)
  }
  else{
    cb(new Error("file is not of the correct type"),false)
  }
}
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


routerFicheVéhicule.get('/', function (req, res) {
    FicheVéhicule.find((err, data) => {
      res.send(data)
      console.log(data)
      
    })
  })
  routerFicheVéhicule.get('/:EcoleNameId', function (req, res) {
    FicheVéhicule.find({EcoleNameId: req.params.EcoleNameId},(err, data) => {
       res.send(data)
       console.log(data)
     }
     )
   });
  
 

// **CreatePost**/////////////////////////////////////////////////////
routerFicheVéhicule.post("/", upload.single('file'), async (req, res) => {
    /*const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'tmp/dest')
      },
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + ' -' + Math.rond(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
      },
    })*/
    if(req.file)
    {
      try {
      let myFicheVéhicule = new FicheVéhicule({
        //logoUrl: req.file !==null? "/data/uploads/" + req.file.filename:"",
        logoUrl:req.file.location,
        pictureName:req.file.originalname,
        UserPseudo:req.body.UserPseudo,
        EcoleNameId:req.body.EcoleNameId,
        Nom:req.body.Nom,
        Fonction:req.body.Fonction, 
        idVéhicule:req.body.idVéhicule,  
      });
      await myFicheVéhicule.save();
      console.log(req.file)
      console.log(req.body)
      res.json({ message: "Created" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }}
    else{
      try {
        let myFicheVéhicule = new FicheVéhicule({
          logoUrl:req.body.logoUrl,
          pictureName:req.body.pictureName,
          UserPseudo:req.body.UserPseudo,
          EcoleNameId:req.body.EcoleNameId,
          Nom:req.body.Nom,
          Fonction:req.body.Fonction, 
          idVéhicule:req.body.idVéhicule,  
        });
        await myFicheVéhicule.save();
        console.log(req.file)
        console.log(req.body)
        res.json({ message: "Created" });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  });  

  /****************delete part******* */
  routerFicheVéhicule.delete('/delete/:_id',(req,res)=>{
    FicheVéhicule.findOneAndDelete({_id:req.params._id},function(err,data){
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


  export default routerFicheVéhicule