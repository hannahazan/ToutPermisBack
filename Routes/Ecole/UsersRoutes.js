import  express from 'express'
import multer from "multer"
import  uuidv4 from 'uuidv4'
const routerUsers= express.Router()
routerUsers.use(express.json());
routerUsers.use(express.urlencoded({extended: true}))
import Users from '../../Models/ModelEcole/UsersModel.js'
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

routerUsers.get('/', function (req, res) {
    Users.find((err, data) => {
       res.send(data)
       console.log(data)
       
     })
   })
routerUsers.get('/:Mail', function (req, res) {
    Users.findOne({ Mail: req.params.Mail }, (err, data) => {
    res.send(data)
    console.log(data)
    }
    )
});

routerUsers.get('/:Mail/:Password', function (req, res) {
  Users.findOne({ Mail: req.params.Mail,Password:req.params.Password }, (err, data) => {
  res.send(data)
  console.log(data)
  }
  )
})
//l'attribut $and = les paramètres sont obligatoires
routerUsers.post('/connect/PostGet', function (req, res) {
  Users.findOne({$and:[{Mail: req.body.Mail} ,{Password:req.body.Password}] }, (err, data) => {
  res.send(data)
  console.log(data)
  }
  )
})
   
//try deploy
// **CreatePost**/////////////////////////////////////////////////////
routerUsers.post("/", upload.single('file'), async (req, res) => {
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
      let myUser = new Users({
        Name:req.body.ecoleNumber,
        Mail:req.body.userPseudo,
        couvertureUrl: req.file !==null? "/data/uploads/" + req.file.filename:"",
        pictureName:req.file.originalname,
        Password:req.body.Password,
        PhoneNumber:req.body.PhoneNumber,
        Ecole:req.body.Ecole,
        Medecin:req.body.Medecin,
        Aménageur:req.body.Aménageur,
        UserPicture:req.body. UserPicture
      });
      await myUser.save();
      console.log(req.file)
      console.log(req.body)
      res.json({ message: "Created" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  routerUsers.post('/test', function (req, res, next) {
    var myNewUser = new Users({
        Name:req.body.Name,
        Prenom:req.body.Prenom,
        Mail:req.body.Mail,
        Password:req.body.Password,
        PhoneNumber:req.body.PhoneNumber,
        Ecole:req.body.Ecole,
        Medecin:req.body.Medecin,
        Aménageur:req.body.Aménageur,
        UserPicture:req.body.UserPicture,
        Initiales:req.body.Initiales,
        Admin:req.body.Admin
    })
    myNewUser.save(function (err, post) {
      if (err) { return next(err) }
      res.status(201).json(post)
    })
  })
  routerUsers.put('/addContact/:Mail',(req,res) => {
    Users.updateOne({Mail:req.params.Mail},{$push:{ContactList:{$each:[req.body.ContactList]}}},function(err,data){
      console.log(req.body)
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

  routerUsers.put('/removeContact/:Mail',(req,res) => {
    Users.updateOne({Mail:req.params.Mail},{$pull:{ContactList:req.body.ContactList}},function(err,data){
      console.log(req.body)
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

  routerUsers.put('/:Mail',(req,res) => {
    Users.updateOne({Mail:req.params.Mail},{$push:{Message:{$each:[req.body.Message]}}},function(err,data){
      console.log(req.body)
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
  routerUsers.put('/removeMessage/:Mail',(req,res) => {
    Users.updateOne({Mail:req.params.Mail},{$pull:{Message:req.body.Message}},function(err,data){
      console.log(req.body)
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
  export default routerUsers