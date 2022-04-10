import dbConnect from "../../../util/mongo";
import Order from "../../../models/Order";

{/** Après la creation des constances , nous faisons appel à la base de données et et soit en recuperant ou soit en ajoutant une commandes et mettre à jour */}
const handler = async (req, res) => {
    const { method, query:{id} } = req;

    await dbConnect();
    
    if (method === "GET") {
        try {
          const order = await Order.findById(id);
          res.status(200).json(order);
        } catch (err) {
          res.status(500).json(err);
        }
      }
    {/** Enregistrement des mis à jour des commandes */}  
    if(method === "PUT"){
        try {
            const order = await Order.findByIdAndUpdate(id, req.body, {
              new: true,
            });
            res.status(200).json(order);
          } catch (err) {
            res.status(500).json(err);
          }
    }
    if(method === "DELETE"){}

};

export default handler;