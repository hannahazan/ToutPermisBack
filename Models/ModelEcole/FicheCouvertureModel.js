import mongoose from "mongoose";
const ficheCouverture = new mongoose.Schema(
    {
        EcoleNameId:String,
        UserPseudo:String,
        CouvertureUrl:String,
        PictureName:String,
        idCouv:Number,
        Ecole:Boolean,
        Medecin:Boolean,
        Amenageur:Boolean
    });
 
     
 const FicheCouverture = mongoose.model('FicheCouverture',ficheCouverture);
 
 
 export default FicheCouverture;