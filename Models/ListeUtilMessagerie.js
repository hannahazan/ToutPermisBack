import mongoose from "mongoose";
const MessUtilSchema = new mongoose.Schema(
    {
        ListeContacts:Array,
    });
 
 
 

 const MessUtil= mongoose.model('MessUtil',MessUtilSchema);
 
 
 export default MessUtil;