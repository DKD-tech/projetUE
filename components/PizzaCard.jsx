import Image from "next/image";
import styles from "../styles/PizzaCard.module.css";
import Link from "next/link"

const PizzaCard = ({pizza}) => {
  return (
    <div className={styles.container}>
      <div className={styles.details}>
       <div className={styles.img}>
       <Link href={`/product/${pizza._id}`} passHref>
            <Image src={pizza.img} alt="" width="500" height="500"/>
            </Link> </div>
      <h1 className={styles.title}>{pizza.title}</h1>
      <span className={styles.price}>{pizza.prices[0]}€</span>
    </div>
    </div>
  );
};

export default PizzaCard;
