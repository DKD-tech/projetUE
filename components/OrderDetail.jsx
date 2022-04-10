import styles from "../styles/OrderDetail.module.css";
import { useState } from "react";

const OrderDetail = ({total, createOrder}) =>{
    const [customer, setCustomer] = useState("");
    const [address, setAddress] = useState("");

    const handleClick = () => {
        createOrder({ customer, address, total, method: 0 });
      };
    

    return (
        <div className={styles.container}>
         <div className={styles.wrapper}>
             <h1 className={styles.title}>Vous payerez $12 après la livraison.</h1>
             <div className={styles.item}>
                 <label className={styles.label}>Nom Prenom </label>
                 <input placeholder="Bougouri Keita" type="text" className={styles.input} onChange={(e)=>setCustomer(e.target.value)}
                 />
             </div>
             <div className={styles.item}>
                 <label className={styles.label}>N° Tel</label>
                 <input type="text" placeholder="+33 7 12 54 89 00" className={styles.input}/>
             </div>
             <div className={styles.item}>
                 <label className={styles.label}>Adresse</label>
                 <textarea
                 rows={5}
                  type="text" 
                  placeholder=" 23 Rue Trois Cailloux" 
                  className={styles.textarea}
                  onChange={(e) => setAddress(e.target.value)}
                  />
             </div>
             <button className={styles.button} onClick={handleClick}>Commander</button>
         </div>
        </div>
        //
        /** */
    )
} 

export default  OrderDetail;