import dbConnect from "../../../util/mongo";
import Product from "../../../models/Product";


{/**
 Nous allons faire des recupereation ou soit de modification à travers les id
 */}
 {/** 
 Une API (application programming interface ou « interface de programmation d'application ») est une 
 interface logicielle qui permet de « connecter » un logiciel 
 ou un service à un autre logiciel ou service afin d'échanger des données et des fonctionnalités. tels que notre
MongoBD Atlas */}

{/** Après la creation des constances , nous faisons appel à la base de données et lassons des conditions */}
export default async function handler(req, res) {
   const {
       method, 
       query:{id}, 
       cookies
    } = req;
    const token = cookies.token

    dbConnect();
{/** Cette condition va nous permettre de recuperer un produits à travers son id sinon ils nous affiche un message d'erreur*/}
   if(method === "GET"){
      try {
         const product = await Product.findById(id);
         res.status(200).json(product);
      } catch (error) {
         res.status(500).json(error)
      }
   }
   {/** Boutton Ajout : Cette condition va nous permettre faire une mise a jour  à travers son id tout en verifiant si 
     l'utilisateur admin est authentifie sinon il n'y aura pas de mis à jour */}
   if(method === "PUT"){
      if (!token || token !== process.env.token) {
         return res.status(401).json("Non authentifié!")
      }
      {/** La partie exception le produits sera mis à jour , et il créra le nouveau produit  */}
     try {
        const product = await Product.findOneAndUpdate(id, req.body,{
           new: true,
        });
        res.status(201).json(product);
     } catch (error) {
         res.status(500).json(error);
     }
   }
   {/** Cette condition va nous permettre de supprimer un produits à travers son id sinon ils nous affiche un message d'erreur*/}
   if(method === "DELETE"){
      if (!token || token !== process.env.token) {
         return res.status(401).json("Non authentifié!")
      }
    try {
       await Product.findByIdAndDelete(id);
       res.status(201).json("Le produit à été supprimé!");
    } catch (error) {
        res.status(500).json(error);
    }
  }
  }