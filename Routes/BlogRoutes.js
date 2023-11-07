import  express from 'express'
import multer from "multer"
import  uuidv4 from 'uuidv4'
const routerBlog= express.Router()
routerBlog.use(express.json());
routerBlog.use(express.urlencoded({extended: true}))
import Blog from '../Models/Blog.js'

const upload = multer({ dest: 'toutpermis-app/public/data/uploads' })


routerBlog.get('/', function (req, res) {
    Blog.find((err, data) => {
      res.send(data)
      console.log(data)
      
    })
  })
routerBlog.get('/:UniqueId', function (req, res) {
    Blog.find({UniqueId: req.params.UniqueId},(err, data) => {
       res.send(data)
       console.log(data)
     }
     )
   });

  routerBlog.post('/test/getONe', function (req, res) {
    Blog.findOne({UniqueId: req.body.UniqueId }, (err, data) => {
       res.send(data)
       console.log(data)
     }
     )
   });

// **CreatePost**/////////////////////////////////////////////////////
routerBlog.post("/", upload.single('file'), async (req, res) => {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'tmp/dest')
      },
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + ' -' + Math.rond(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
      },
    })
    if(req.file)
    {
      try {
      let myBlog = new Blog({
        PicBlogUrl: req.file !==null? "/data/uploads/" + req.file.filename:"",
        pictureName:req.file.originalname,
        Titre:req.body.Titre,
        SousTitre:req.body.SousTitre,
        Surtitre:req.body.Surtitre,
        Chapo:req.body.Chapo,
        Texte:req.body.Texte,
        Liens:req.body.Liens,
        Financement:req.body.Financement,
        Voiture:req.body.Voiture,
        Moto:req.body.Moto,
        Bateau:req.body.Bateau,
        code:req.body.code,
        Examen:req.body.Examen,
        Medecin:req.body.Medecin,
        Amenageur:req.body.Amenageur,
        UniqueId:req.body.UniqueId,
        Selection:req.body.Selection,
        EditDate:req.body.EditDate,
        ModifDate:req.body.Modifdate,
        Handicap:req.body.Handicap,
        Actualites:req.body.Actualites,
        CatPermisConduire:req.body.CatPermisConduire,
        Pratique:req.body.Pratique,
        BoiteOutils:req.body.BoiteOutils,
        BoitesGants:req.body.BoitesGants,
        Faqs:req.body.Faqs,
      });
      await myBlog.save();
      console.log(req.file)
      console.log(req.body)
      res.json({ message: "Created" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }}
    else{
      try {
        let myBlog = new Blog({
            PicBlogUrl:req.body.PicBlogUrl,
            pictureName:req.body.pictureName,
            Titre:req.body.Titre,
            SousTitre:req.body.SousTitre,
            Surtitre:req.body.Surtitre,
            Chapo:req.body.Chapo,
            Texte:req.body.Texte,
            Liens:req.body.Liens,
            Financement:req.body.Financement,
            Voiture:req.body.Voiture,
            Moto:req.body.Moto,
            Bateau:req.body.Bateau,
            code:req.body.code,
            Examen:req.body.Examen,
            Medecin:req.body.Medecin,
            Amenageur:req.body.Amenageur,
            UniqueId:req.body.UniqueId, 
            Selection:req.body.Selection,
            EditDate:req.body.EditDate,
            ModifDate:req.body.ModifDate,
            Handicap:req.body.Handicap,
            Actualites:req.body.Actualites,
            CatPermisConduire:req.body.CatPermisConduire,
            Pratique:req.body.Pratique,
            BoiteOutils:req.body.BoiteOutils,
            BoitesGants:req.body.BoitesGants,
            Faqs:req.body.Faqs,  
        });
        await myBlog.save();
        console.log(req.file)
        console.log(req.body)
        res.json({ message: "Created" });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  });  

  routerBlog.post('/:UniqueId',upload.single('file'),(req,res) => {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'tmp/dest')
      },
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + ' -' + Math.rond(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
      },
    })
    Blog.findOneAndUpdate({UniqueId:req.params.UniqueId},req.body, req.file.filename,function(err,data){
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
              console.log(req.body)
             }
        }
      })
    })

  /****************delete part******* */
 routerBlog.delete('/delete/:_id',(req,res)=>{
    Blog.findOneAndDelete({_id:req.params._id},function(err,data){
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


  export default routerBlog