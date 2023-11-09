import mongoose from 'mongoose';
import express from 'express';
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


const Pictures=[
  {
      "id": 1,
      "name":"Parking 1",
      "type": "AIRPORT",
      "city": "ROISSY EN FRANCE"
  },
  {
      "id": 2,
      "name":"Parking 2",
      "type": "AIRPORT",
      "city": "BEAUVAIS"
  },
  {
      "id": 3,
      "name":"Parking 3",
      "type": "AIRPORT",
      "city": "ORLY"
  },
  {
      "id": 4,
      "name":"Parking 4",
      "type": "AIRPORT",
      "city": "NICE"
  },
  {
      "id": 5,
      "name":"Parking 5",
      "type": "AIRPORT",
      "city": "LILLE"
  }


]


const app = express()
const port = process.env.PORT||5000
/*const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000"
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
});*/

app.use(cors(
  {
    /*origin:"https://tout-permis5-rd7j.vercel.app/",
    methods:["GET","POST"],
    credentials:true*/
    origin:"https://toutpermisfront-production.up.railway.app",
    methods:["GET","POST","PUT","DELETE"],
    credentials:true

}
))
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))


app.get("/Pictures",(req, res) => { 
  res.status(200).json(Pictures)
})
app.use('/FicheCouverture',routerFicheCouverture)
app.use('/FicheLogo',routerFicheLogo)
app.use('/FicheEcolePrincipale',routerFicheEcolePrincipale)
app.use('/Users',routerUsers)
app.use('/FicheEquipes',routerFicheEquipes)
app.use('/FicheVehicule',routerFicheVéhicule)
app.use('/Blog',routerBlog)
app.use('/MessUtil',routerMessUtil)

const db_url='mongodb+srv://hannah:TBlIyaXZd1aS1wgh@cluster0.aailhd7.mongodb.net/Toutpermis?retryWrites=true&w=majority'



// connection à la bdd mongodb
main().catch(err => console.error(err))
async function main() {
    
    await mongoose.connect('mongodb+srv://hannah:TBlIyaXZd1aS1wgh@cluster0.aailhd7.mongodb.net/Toutpermis?retryWrites=true&w=majority');
    console.log("connection réussi");
    
}

/*httpServer.listen(4000,()=>{
  console.log("connexion réussi port 4000 socket")
})*/
app.listen(port, () => {
  console.log(`app listening on port ${port}`)
console.log(process.env.PORT)})