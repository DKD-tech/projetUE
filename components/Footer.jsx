import Image from "next/image";
import styles from "../styles/Footer.module.css";

const Footer = () => {
    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <Image src="/img/bg.png" objectFit="cover" layout="fill" alt=""/>
            </div>
          <div className={styles.item}>
            <div className={styles.card}>
            <h2 className={styles.motto}>
                Choisissez les restos de vos choix et faite vous Livrez jusqu'a chez vous 
            </h2>
            </div>
            <div className={styles.card}>
                <h1 className={styles.title}>Rapidos FAST- DELIVERY</h1>
                <p className={styles.text}>
                    43 RUE DES TROIS CAILLOUX 
                    <br /> Amiens, 80000
                    <br /> (+33) 6 13 43 57 00
                </p>
            </div>
            <div className={styles.card}>
                <h1 className={styles.title}>HEURES DE TRAVAIL</h1>
                <p className={styles.text}>
                    DU LUNDI AU VENDREDI
                    <br /> 09H00 - 23H00
                </p>
                <p className={styles.text}>
                    DU SAMEDI AU DIMANCHE
                    <br /> 12H00 - 02H00
                </p>
            </div>
          </div>
        </div>
    )
}
export default Footer;
