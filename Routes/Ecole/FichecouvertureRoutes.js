import  express from 'express'
import multer from "multer"
const routerFicheCouverture= express.Router()
routerFicheCouverture.use(express.json());
routerFicheCouverture.use(express.urlencoded({extended: true}))
import FicheCouverture from '../../Models/ModelEcole/FicheCouvertureModel.js'

const upload = multer({ dest: 'toutpermis-app/public/data/uploads' })

routerFicheCouverture.post("/", upload.single('file'), async (req, res) => {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'tmp/dest')
      },
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + ' -' + Math.rond(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
      },
    })
    try {
      let myFicheCouverture= new FicheCouverture({
        EcoleNameId:req.body.EcoleNameId,
        UserPseudo:req.body.UserPseudo,
        CouvertureUrl: req.file !==null? "/data/uploads/" + req.file.filename:"",
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