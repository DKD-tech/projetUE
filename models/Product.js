import  mongoose  from "mongoose";

 const ProductSchema = new mongoose.Schema({
     // A l'interieur nous allons mettre  tous nos proprieté
     title:{
         type:String,
         required:true,
         maxlength:60,
     },
     desc:{
        type:String,
        required:true,
        maxlength:200,
    },
    img:{
        type:String,
        required:true,
    },
    prices:{
        //vue que nous allons avoir plusieurs nous allons créer un type tableau
        type: [Number],
        required: true,
    },
    extraOptions:{
        // Il va  inclure des objets , tableau on aura un objet , et dans cet objet  nous devons avoir un text
        //  et ecrire tout ce que nous voulons. A chaque fois que nous choississons des ingredients , il va ajouter du textes ,  son prix et l'ajouter au prix  de la nourriture 
        type:[{
            text:{ type: String, required:true}, 
            price:{ type: Number, required:true},
        },
    ],
    },
    },
     { timestamps: true }
 );
// Nous allons l'exporter tout en ajoutant une conditions mongoose models. Si nous avons ce produits modèle stockés  ne le créez pas à nouveau
// utilisez le  s'il n'y a pas de modele  créez simplement un nouveau modèle
 export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);