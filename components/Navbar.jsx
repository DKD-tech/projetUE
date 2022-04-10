import Image from "next/image";
import styles from "../styles/Navbar.module.css";
import { useSelector } from "react-redux";
import Link from "next/link";
import{SearchRounded} from '@mui/icons-material';
import {NextLink} from '@material-ui/core';

const Navbar = () => {

    {/** la quantité en fonction du panier */}
    const quantity = useSelector((state) => state.cart.quantity)
    return (
        <div className={styles.container}>
           <div className={styles.item}>
           <div className={styles.callButton}>
                   <Image src="/img/Delivery.png" alt="" width="100" height="100"/>
               </div>
               <div className={styles.texts}>
               <div className={styles.text}>FAST DELIVERY</div>
               </div>
           </div>
           <div className={styles.item}>
               <ul className={styles.list}>
               <Link  href="/" passHref>
               <li className={styles.listItem}>Accueil</li></Link>
                   <li className={styles.listItem}>Produits</li>
                   <li className={styles.listItem}>Categories</li>
                   <li className={styles.inputBox}>
                   <SearchRounded className={styles.searchIcon} />
                   <input type="text" placeholder="rechercher" />
                   </li>
               </ul>
           </div>
           <Link  href="/cart" passHref>
           <div className={styles.item}>
               <div className={styles.cart}>
               <Image src="/img/cart.png" alt="" width="30px" height="30px" />
               <div className={styles.counter}>{quantity}</div>  
               </div>
               <div className={styles.login}>
               <Link href="/admin/login" passHref>
                   <ul>
                   <li>Login</li></ul>
               </Link>
               </div>
           </div>
           </Link>
        </div>
    )
}
export default Navbar