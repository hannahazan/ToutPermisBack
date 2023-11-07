import mongoose from "mongoose";
const BlogSchema = new mongoose.Schema(
    {
        Titre:String,
        SousTitre:String,
        Surtitre:String,
        Chapo:String,
        Texte:String,
        Liens:String,
        Financement:Boolean,
        Voiture:Boolean,
        Moto:Boolean,
        Bateau:Boolean,
        code:Boolean,
        Examen:Boolean,
        Medecin:Boolean,
        Amenageur:Boolean,
        Handicap:Boolean,
        UniqueId:String,
        PicBlogUrl:String,
        Selection:Boolean,
        EditDate:String,
        ModifDate:String,
        PictureName:String,
        Actualites:Boolean,
        CatPermisConduire:Boolean,
        Pratique:Boolean,
        BoiteOutils:Boolean,
        BoitesGants:Boolean,
        Faqs:Boolean
    });
 
 
 

 const Blog= mongoose.model('Blog',BlogSchema);
 
 
 export default Blog;