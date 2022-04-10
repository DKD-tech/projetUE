import Image from "next/image";
import styles from "../../styles/Product.module.css";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";
import Link from "next/link";


{/** Notre page envoie  une page conntenant les informations de la base des données du produit choisies à l'accueil */}
const Product = ({ pizza }) => {
    const [price, setPrice] = useState(pizza.prices[0]);
    const [size, setSize] = useState(0);
    const [quantity, setQuantity]=useState(1)
    const [extras, setExtras] = useState([])
    const dispatch = useDispatch();

    const changePrice = (number) => {
      setPrice(price + number);
    }
// L'ajout du prix de pizza avec les ingrediens
    const handleSize = (sizeIndex)=>{
      const difference = pizza.prices[sizeIndex] - pizza.prices[size];
      setSize(sizeIndex);
      changePrice(difference);
    };

    const handleChange = (e,option) =>{
      const checked = e.target.checked;
      
// Notre constance si va se charger de faire un changement à la moindre click sur la taille , ing etc...
      if(checked){
        changePrice(option.price);
        setExtras(prev=>[...prev,option])       
      }else{
        changePrice(-option.price)
        setExtras(extras.filter((extra)=> extra._id !== option._id))
      }
    };
    // Cette constance va se charger de recuperer le click sous l'ajout du panier
    const handleClick = () => {
        dispatch(addProduct({...pizza,extras, price, quantity}));
    };
    
    return <div className={styles.container}>
        <div className={styles.left}>
        <div className={styles.imgContainer}>
            <Image src={pizza.img} objectFit="contain" layout="fill" alt=""/>
        </div>
        </div>
        <div className={styles.right}>
            <h1 className={styles.title}>{pizza.title}</h1>
            <span className={styles.price}>{price}€</span>
            <p className={styles.desc}>{pizza.desc}</p>
            <h3 className={styles.choose}>Choisir la taille</h3>
            <div className={styles.sizes}>
            <div className={styles.size} onClick={()=>handleSize(0)}>
              <Image src="/img/size.png" layout="fill" alt=""/> 
              <span  className={styles.number}>Petit</span>
            </div>
            <div className={styles.size} onClick={()=>handleSize(1)}>
              <Image src="/img/size.png" layout="fill" alt=""/> 
              <span  className={styles.number}>Moyenne</span>
            </div>
            <div className={styles.size} onClick={()=>handleSize(2)}>
              <Image src="/img/size.png" layout="fill" alt=""/> 
              <span  className={styles.number}>Large</span>
            </div>
            </div>
            <h3 className={styles.choose}>Choisir des ingredients supplementaires</h3>
            <div className={styles.ingredients}>
              {pizza.extraOptions.map(option=>(
                <div className={styles.option} key={option._id}>
                <input 
                type="checkbox" 
                id={option.text} 
                name={option.text} 
                className={styles.checkbox}
                onChange={(e)=>handleChange(e,option)}
                 />
                 <label htmlFor="double">{option.text}</label>
            </div>
              ))}
            </div>
            <div className={styles.add}>
                <input onChange={(e)=>setQuantity(e.target.value)} 
                type="number" defaultValue={1} className={styles.quantity} />
                <button className={styles.button} onClick={handleClick}>Ajouter  au panier </button>
            </div>
            <div className={styles.back}>
              <Link href="/" >
              <button>Retour</button>
              </Link>
         </div>
        </div>
    </div>;
    
};

export const getServerSideProps = async ({params}) =>{
    const res = await axios.get(`http://localhost:3000/api/products/${params.id}`);
    return{
      props:{
        pizza:res.data,
    },
    };
  };

export default Product;