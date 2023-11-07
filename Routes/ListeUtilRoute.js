import  express from 'express'
import multer from "multer"
const routerMessUtil= express.Router()
routerMessUtil.use(express.json());
routerMessUtil.use(express.urlencoded({extended: true}))
import MessUtil from '../Models/ListeUtilMessagerie.js';

const upload = multer({ dest: 'toutpermis-app/public/data/uploads' })


routerMessUtil.get('/', function (req, res) {
   MessUtil.find((err, data) => {
      res.send(data)
      console.log(data)
      
    })
  })
  routerMessUtil.get('/:_id', function (req, res) {
    MessUtil.findById({_id:req.params._id},(err, data) => {
       res.send(data)
       console.log(data)
     })
   })
  

routerMessUtil.get('/One/:UserPseudo', function (req, res) {
   MessUtil.find({UserPseudo: req.params.UserPseudo}, (err, data) => {
      res.send(data)
      console.log(data)
    }
    )
  });

  routerMessUtil.get('/creation/:EcoleNameId', function (req, res) {
    MessUtil.findOne({EcoleNameId: req.params.EcoleNameId}, (err, data) => {
       res.send(data)
       console.log(data)
     }
     )
   });

 routerMessUtil.put('/:EcoleNameId',(req,res) => {
  MessUtil.findOneAndUpdate({EcoleNameId:req.params.EcoleNameId},req.body,function(err,data){
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
 routerMessUtil.put('/addNewUtilisateur/:_id',(req,res) => {
    MessUtil.updateOne({_id:"6528398bd2efed6f6387edc4"},{$push:{ListeContacts:{$each:[req.body.ListeContacts],$position:0}}},function(err,data){
      console.log('je rentre bien dans le put du fucking messutil')
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
  routerMessUtil.put('/addFormationCarte/:EcoleNameId',(req,res) => {
    MessUtil.updateOne({EcoleNameId:req.params.EcoleNameId},{$push:{FormationCarte:{$each:[req.body.FormationCarte],$position:0}}},function(err,data){
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
  routerMessUtil.put('/addHorairesBureau/:EcoleNameId',(req,res) => {
    MessUtil.updateOne({EcoleNameId:req.params.EcoleNameId},{HorairesBureau:req.body.HorairesBureau},function(err,data){
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
  routerMessUtil.put('/addHorairesConduite/:EcoleNameId',(req,res) => {
    MessUtil.updateOne({EcoleNameId:req.params.EcoleNameId},{HorairesConduite:req.body.HorairesConduite},function(err,data){
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
  routerMessUtil.put('/addSpe/:EcoleNameId',(req,res) => {
    MessUtil.updateOne({EcoleNameId:req.params.EcoleNameId},{$push:{Specialite:{$each:[req.body.Specialite],$position:0}}},function(err,data){
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
  routerMessUtil.put('/UpdateContacts/:_id',(req,res) => {
    MessUtil.updateOne({_id:"6528398bd2efed6f6387edc4"},{$set:{["ListeContacts."+req.body.Index]:req.body.ListeContacts},$position:0},function(err,data){
      console.log(`${req.body} les infos de l'update`)
      
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
  routerMessUtil.put('/removeContact/:_id',(req,res) => {
    MessUtil.updateOne({_id:"6528398bd2efed6f6387edc4"},{$pull:{ListeContacts:req.body.ListeContacts}},function(err,data){
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

  routerMessUtil.put('/addTarif/:EcoleNameId',(req,res) => {
    MessUtil.updateOne({EcoleNameId:req.params.EcoleNameId},{$push:{Tarifs:{$each:[req.body.Tarifs],$position:0}}},function(err,data){
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
  routerMessUtil.put('/UpdateTarif/:EcoleNameId',(req,res) => {
    MessUtil.updateOne({EcoleNameId:req.params.EcoleNameId},{$set:{["Tarifs."+req.body.Index]:req.body.Tarifs}},function(err,data){
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
  routerMessUtil.put('/removeTarif/:EcoleNameId',(req,res) => {
    MessUtil.updateOne({EcoleNameId:req.params.EcoleNameId},{$pull:{Tarifs:req.body.Tarifs}},function(err,data){
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

  routerMessUtil.put('/removeFormation/:EcoleNameId',(req,res) => {
    MessUtil.updateOne({EcoleNameId:req.params.EcoleNameId},{$pull:{Formation:req.body.Formation}},function(err,data){
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
  routerMessUtil.put('/removeFormationCarte/:EcoleNameId',(req,res) => {
    MessUtil.updateOne({EcoleNameId:req.params.EcoleNameId},{$pull:{FormationCarte:req.body.FormationCarte}},function(err,data){
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
  
  routerMessUtil.post('/', function (req, res, next) {
    var myNewListe= new MessUtil({
     ListeContacts:req.body.ListeContacts
    })
    myNewListe.save(function (err, post) {
      if (err) { return next(err) }
      res.json(201, post)
    })
  })
  
  routerMessUtil.delete('/delete/:EcoleNameId',(req,res)=>{
    MessUtil.findOneAndDelete({EcoleNameId:req.params.EcoleNameId},function(err,data){
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

  routerMessUtil.put('/removeContact/upadateContact/:_id',(req,res) => {
    MessUtil.updateOne({_id:"6528398bd2efed6f6387edc4"},{$pull:{ListeContacts:req.body.ListeContacts}},function(err,data){
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
    MessUtil.updateOne({_id:"6528398bd2efed6f6387edc4"},{$push:{ListeContacts:{$each:[req.body.ListeContacts],$position:0}}},function(err,data){
      console.log('je rentre bien dans le put du fucking messutil')
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
      }})
  })

  routerMessUtil.put('/addNewUtilisateur/:_id',(req,res) => {
    MessUtil.updateOne({_id:"6528398bd2efed6f6387edc4"},{$push:{ListeContacts:{$each:[req.body.ListeContacts],$position:0}}},function(err,data){
      console.log('je rentre bien dans le put du fucking messutil')
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

  

  export default routerMessUtil