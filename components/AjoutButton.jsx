import styles from "../styles/Add.module.css";

const AjoutButton = ({setClose}) => {
    return(
        <div onClick={() => setClose(false)} className={styles.mainAjoutButton}>Ajouter un produit</div>
    )
}

export default AjoutButton