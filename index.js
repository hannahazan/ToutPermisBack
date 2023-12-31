import mongoose from 'mongoose';
import express, { json } from 'express';
import cors from 'cors'
import { createServer } from "http";
import { Server } from "socket.io";
import routerFicheLogo from './Routes/Ecole/ficheLogoRoutes.js'
import routerFicheEcolePrincipale from './Routes/Ecole/ficheEcoleprincipaleRoutes.js';
import routerUsers from './Routes/Ecole/UsersRoutes.js';
import routerFicheCouverture from './Routes/Ecole/FichecouvertureRoutes.js';
import routerFicheEquipes from './Routes/Ecole/FicheEquipesRoutes.js';
import routerFicheVéhicule from './Routes/Ecole/FicheVéhiculeRoute.js';
import routerBlog from './Routes/BlogRoutes.js';
import routerMessUtil from './Routes/ListeUtilRoute.js';
import pictureRoute from './Routes/PicturesRoutes.js';
import Pictures from './Pictures.js';
import { readFile } from 'fs/promises';
import 'dotenv/config'
import AWS from 'aws-sdk'

const dockJson = JSON.parse(
  await readFile(
    new URL('./PicturesTest.json', import.meta.url)
  )
);


const app = express()
const port = process.env.PORT||5000
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["https://toutpermisfront-production.up.railway.app","http://localhost:3000"],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}
});
var users = [];
io.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("join_room",(data)=>{
    socket.join(data)
    console.log(`je suis bien rentrée là-dedans ${data}`)
  })
  //Listens and logs the message to the console
  socket.on('message', (data) => {
    console.log(`${data} avant emit`)
    io.to(data.room).emit('messageResponse', data);
    console.log(data.room);
    console.log(data)
  }); 
  
  socket.on('NoteMessageReçus',(data)=>{
    io.emit('NoteMessageReçus',data)
  });
  socket.on('newUser', (data) => {
    console.log(`${data} la data du user`)
    users.push(data);
    console.log(`${users} ça c'est le user`)
    io.emit('newUserResponse',users)
    ;
    //Sends the list of users to the client
    
  });

  socket.on('disconnect', () => {
    console.log(`${socket.id}: A user disconnected`);
    users.filter((user) => user.socketID != socket.id);
    console.log('je suis bien rentré dans la deconnexion')
    console.log(users);
    //Sends the list of users to the client
   io.emit('newuserResponse', users);
    socket.disconnect();
  });
  socket.on('connect',()=>{
    console.log(`${socket.id}: A user connected`);
  })
});

app.use(cors(
  {
    /*origin:"https://tout-permis5-rd7j.vercel.app/",
    methods:["GET","POST"],
    credentials:true*/
    origin:["https://toutpermisfront-production.up.railway.app","http://localhost:3000"],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true

}
))
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))


/*app.get("/Pictures",(req, res) => { 
  res.status(200).json(Pictures)
})
app.get("/Pictures/:id",(req,res)=>{
  const id = parseInt(req.params.id)    
  const Picture = Pictures.find(Picture => Picture.id === id)    
  res.status(200).json(Picture)
})*/

app.use('/Pictures',pictureRoute)
app.use('/FicheCouverture',routerFicheCouverture)
app.use('/FicheLogo',routerFicheLogo)
app.use('/FicheEcolePrincipale',routerFicheEcolePrincipale)
app.use('/Users',routerUsers)
app.use('/FicheEquipes',routerFicheEquipes)
app.use('/FicheVehicule',routerFicheVéhicule)
app.use('/Blog',routerBlog)
app.use('/MessUtil',routerMessUtil)





// connection à la bdd mongodb
main().catch(err => console.error(err))
async function main() {
    
    await mongoose.connect(process.env.MONGO_PRIVATE_URL);
    console.log("connection réussi");
    
}

/*httpServer.listen(4000,()=>{
  console.log("connexion réussi port 4000 socket")
})*/
httpServer.listen(port, () => {
  console.log(`app listening on port ${port}`)
  })