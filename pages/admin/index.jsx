import styles from "../../styles/Admin.module.css"
import Image from "next/image";
import axios from "axios"; 
import { useState } from "react";

const Index = ({orders, products}) => {

    {/**  l'état n'est créé qu'au premier affichage de notre composant 
     useState nous renvoie l'état actuel de notre commande et nos produits*/}  
    const [pizzaList, setPizzaList] = useState(products);
    const [orderList, setOrderList] = useState(orders);
    {/** Notre status de Livraison */}
    const status = ["prepation", "En cours de chemin", "Livré"]

    {/** La constante  handleDelete va permettre  le faite de selectionner la commande delete tout en recuperant 
     l'id du produit  en le supprimant dans la liste des produits de notre api */}
    const handleDelete = async (id)=>{
        try {
            const res = await axios.delete("http://localhost:3000/api/products/"+ id);
            // il filtra les resultats après la suppression d'une commande
            setPizzaList(pizzaList.filter(pizza=>pizza._id !== id))
        } catch (error) {
            console.log(error);
        }
    }

    {/** Nous allons recuperer aussi le status des commandes  , tout en recuperants la commandes dans notre <api />
    orders en initialisant le statut à 0 (preparation) et à chaque changement de status on ajoute +1 qui prends l'etat  suivant
     et renvoie en filtrant le status du dernier commande modifier en haut de la liste */}
    const handleStatus = async (id) => {

        const item = orderList.filter((order) => order._id === id)[0];
        const currentStatus = item.status
        try {
            const res = await axios.put("http://localhost:3000/api/orders/"+ id , {
                status: currentStatus + 1,
            });
            setOrderList([
                res.data,
                ...orderList.filter((order) => order._id  !== id),
            ])
        } catch (error) {
         console.log(error);   
        }
    }
    {/** Formulaires d'affichages */}
    return (
        <div className={styles.container}>
           <div className={styles.item}>
               <h1 className={styles.title}>Produit</h1>
               <table className={styles.table}>
                   <tbody>
                       <tr className={styles.trTitle}>
                           <th>Image</th>
                           <th>Id</th>
                           <th>Titre</th>
                           <th>Prix</th>
                           <th>Action</th>
                       </tr>
                   </tbody>
                   {pizzaList.map((product)=>(
                   <tbody key={product._id}>
                       <tr className={styles.trTitle}>
                           <td>
                               <Image 
                               src={product.img}
                               width={50}
                               height={50}
                               objectFit="cover"
                               alt=""
                               />
                           </td>
                           <td>{product._id.slice(0,5)}...</td>
                           <td>{product.title}</td>
                           <td>{product.prices[0]}</td>
                           <td>
                               <button className={styles.button}>Editer</button>
                               <button className={styles.button} onClick={() =>handleDelete(product._id)}>Supprimer</button>
                           </td>
                       </tr>
                   </tbody>
                   ))}
               </table>
               </div> 
           <div className={styles.item}>
           <h1 className={styles.title}>Commandes</h1>
               <table className={styles.table}>
                   <tbody>
                       <tr className={styles.trTitle}>
                           <th>Id</th>
                           <th>Client</th>
                           <th>Total</th>
                           <th>Paiement</th>
                           <th>Status</th>
                           <th>Action</th>
                       </tr>
                   </tbody>
                   {orderList.map(order=>(
                   <tbody key={order._id}>
                       <tr className={styles.trTitle}>
                           <td>{order._id.slice(0,5)}...</td>
                           <td>{order.customer}</td>
                           <td>{order.total}</td>
                           <td>{order.method === 0 ?(<span>Cash</span>) : (<span>payer</span>)}</td>
                           <td>{status[order.status]}</td>
                           <td>
                               <button onClick={() =>handleStatus(order._id)}>Stade suivant</button>
                           </td>
                       </tr>
                   </tbody>
                   ))}
               </table>
           </div>
        </div>
    )
}
// cette partie va  nous permettre d'aller piocher tout ce qui existe dans notre base de donnée comme donner de connexion
export const getServerSideProps = async (ctx) => {
    const monCookie = ctx.req?.cookies || "";

{/** Cette page ne sera affiché que lorsque nous allons nous connecter à l'admin et dont la permanance ne reste pas intacte
lorsqu'on met un temps avant d'utiliser la page admin */}
    if (monCookie.token !== process.env.TOKEN) {
        return{
            redirect:{
                destination:"/admin/login",
                permanent:false,
            },
        };
    }

    {/** retourne nos produits et commande à la fin */}
    const productRes = await axios.get("http://localhost:3000/api/products")
    const orderRes = await axios.get("http://localhost:3000/api/orders")

    return{
        props:{
            orders: orderRes.data,
            products: productRes.data,
        },
    };
};
export default Index