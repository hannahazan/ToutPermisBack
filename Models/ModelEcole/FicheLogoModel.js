import mongoose from "mongoose";
const ficheLogoSchema = new mongoose.Schema(
    {
        logoUrl:String,
        pictureName:String,
        UserPseudo:String,
        EcoleNameId:String,
        idLogo:Number,
        Ecole:Boolean,
        Medecin:Boolean,
        Amenageur:Boolean
    });
 

 const FicheLogo= mongoose.model('FicheLogo',ficheLogoSchema);
 
 
 export default FicheLogo;