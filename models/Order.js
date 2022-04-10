import  mongoose  from "mongoose";

 const OrderSchema = new mongoose.Schema({
     // A l'interieur nous allons mettre tous nos proprieté
     customer:{
         type:String,
         required:true,
         maxlength:60,
     },
     address:{
        type:String,
        required:true,
        maxlength:200,
    },
    total:{
        type:Number,
        required:true,
    },
    status:{
        type:Number,
        // Nous allons presenter notre etat initial apres le payement
        default: 0,
    },
    method:{
        // pour la carte de credit , lorsque l'utilisateur va payer en cash le nombre sera zero
        type:Number,
        required: true
    },
 },
     { timestamps: true }
 );
// Nous allons l'exporter tout en ajoutant une conditions mongoose models. Si nous avons ce produits modèle stockés  ne le créez pas à nouveau
// utilisez le  s'il n'y a ppas de modele  créez simplement un nouveau modèle
 export default mongoose.models.Order || mongoose.model("Order", OrderSchema);