import  express from 'express'
import multer from "multer"
import  uuidv4 from 'uuidv4'
const routerFicheEcolePrincipale= express.Router()
routerFicheEcolePrincipale.use(express.json());
routerFicheEcolePrincipale.use(express.urlencoded({extended: true}))
import FicheEcolePrincipale from '../../Models/ModelEcole/ficheEcolePrincipale.js'

const upload = multer({ dest: 'toutpermis-app/public/data/uploads' })


routerFicheEcolePrincipale.get('/', function (req, res) {
   FicheEcolePrincipale.find((err, data) => {
      res.send(data)
      console.log(data)
      
    })
  })
  routerFicheEcolePrincipale.get('/:_id', function (req, res) {
    FicheEcolePrincipale.findById({_id:req.params._id},(err, data) => {
       res.send(data)
       console.log(data)
     })
   })
  

routerFicheEcolePrincipale.get('/One/:UserPseudo', function (req, res) {
   FicheEcolePrincipale.find({UserPseudo: req.params.UserPseudo}, (err, data) => {
      res.send(data)
      console.log(data)
    }
    )
  });

  routerFicheEcolePrincipale.get('/byDepartement/:CodePos', function (req, res) {
    FicheEcolePrincipale.find({CodePos:req.params.CodePos}, (err, data) => {
       res.send(data)
       console.log(data)
     }
     )
   });

  routerFicheEcolePrincipale.get('/creation/:EcoleNameId', function (req, res) {
    FicheEcolePrincipale.findOne({EcoleNameId: req.params.EcoleNameId}, (err, data) => {
       res.send(data)
       console.log(data)
     }
     )
   });

 routerFicheEcolePrincipale.put('/:EcoleNameId',(req,res) => {
  FicheEcolePrincipale.findOneAndUpdate({EcoleNameId:req.params.EcoleNameId},req.body,function(err,data){
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
 routerFicheEcolePrincipale.put('/addFormation/:EcoleNameId',(req,res) => {
    FicheEcolePrincipale.updateOne({EcoleNameId:req.params.EcoleNameId},{$push:{Formation:{$each:[req.body.Formation],$position:0}}},function(err,data){
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
  routerFicheEcolePrincipale.put('/addFormationCarte/:EcoleNameId',(req,res) => {
    FicheEcolePrincipale.updateOne({EcoleNameId:req.params.EcoleNameId},{$push:{FormationCarte:{$each:[req.body.FormationCarte],$position:0}}},function(err,data){
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
  routerFicheEcolePrincipale.put('/addHorairesBureau/:EcoleNameId',(req,res) => {
    FicheEcolePrincipale.updateOne({EcoleNameId:req.params.EcoleNameId},{HorairesBureau:req.body.HorairesBureau},function(err,data){
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
  routerFicheEcolePrincipale.put('/addHorairesConduite/:EcoleNameId',(req,res) => {
    FicheEcolePrincipale.updateOne({EcoleNameId:req.params.EcoleNameId},{HorairesConduite:req.body.HorairesConduite},function(err,data){
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
  routerFicheEcolePrincipale.put('/addSpe/:EcoleNameId',(req,res) => {
    FicheEcolePrincipale.updateOne({EcoleNameId:req.params.EcoleNameId},{$push:{Specialite:{$each:[req.body.Specialite],$position:0}}},function(err,data){
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
  routerFicheEcolePrincipale.put('/UpdateSpe/:EcoleNameId',(req,res) => {
    FicheEcolePrincipale.updateOne({EcoleNameId:req.params.EcoleNameId},{$set:{["Specialite."+req.body.Index]:req.body.Specialite}},function(err,data){
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
  routerFicheEcolePrincipale.put('/removeSpe/:EcoleNameId',(req,res) => {
    FicheEcolePrincipale.updateOne({EcoleNameId:req.params.EcoleNameId},{$pull:{Specialite:req.body.Specialite}},function(err,data){
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

  routerFicheEcolePrincipale.put('/addTarif/:EcoleNameId',(req,res) => {
    FicheEcolePrincipale.updateOne({EcoleNameId:req.params.EcoleNameId},{$push:{Tarifs:{$each:[req.body.Tarifs],$position:0}}},function(err,data){
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
  routerFicheEcolePrincipale.put('/UpdateTarif/:EcoleNameId',(req,res) => {
    FicheEcolePrincipale.updateOne({EcoleNameId:req.params.EcoleNameId},{$set:{["Tarifs."+req.body.Index]:req.body.Tarifs}},function(err,data){
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
  routerFicheEcolePrincipale.put('/removeTarif/:EcoleNameId',(req,res) => {
    FicheEcolePrincipale.updateOne({EcoleNameId:req.params.EcoleNameId},{$pull:{Tarifs:req.body.Tarifs}},function(err,data){
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

  routerFicheEcolePrincipale.put('/removeFormation/:EcoleNameId',(req,res) => {
    FicheEcolePrincipale.updateOne({EcoleNameId:req.params.EcoleNameId},{$pull:{Formation:req.body.Formation}},function(err,data){
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
  routerFicheEcolePrincipale.put('/removeFormationCarte/:EcoleNameId',(req,res) => {
    FicheEcolePrincipale.updateOne({EcoleNameId:req.params.EcoleNameId},{$pull:{FormationCarte:req.body.FormationCarte}},function(err,data){
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
  
  routerFicheEcolePrincipale.post('/test', function (req, res, next) {
    var myNewFiche = new FicheEcolePrincipale({
      EcoleName:req.body.EcoleName,
      EcoleNameId:req.body.EcoleNameId,
      Descriptif:req.body.Descriptif,
      UserPseudo:req.body.UserPseudo,
      Bateau:req.body.Bateau,
      Voiture:req.body.Voiture,
      Moto:req.body.Moto,
      Formation:req.body.Formation,
      HorairesBureau:req.body.HorairesBureau,
      HorairesConduite:req.body.HorairesConduite,
      Mail:req.body.Mail,
      Adresse:req.body.Adresse,
      Téléphone:req.body.Téléphone,
      Site:req.body.Site,
      Bancaire:req.body.Bancaire,
      Cadeau:req.body.Cadeau,
      Cheque:req.body.Cheque,
      Especes:req.body.Especes,
      MailContact:req.body.MailContact,
      SiteWeb:req.body.SiteWeb,
      PhoneNumber:req.body.PhoneNumber
    })
    myNewFiche.save(function (err, post) {
      if (err) { return next(err) }
      res.json(201, post)
    })
  })
  routerFicheEcolePrincipale.delete('/delete/:EcoleNameId',(req,res)=>{
    FicheEcolePrincipale.findOneAndDelete({EcoleNameId:req.params.EcoleNameId},function(err,data){
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

  export default routerFicheEcolePrincipale