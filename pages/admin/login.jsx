import styles from "../../styles/Login.module.css"
import {useRouter} from "next/router";
import { useState } from "react";
import axios from "axios";

{/**  Notre page de connexion utilisateur: admin en commencant par recuperer l'etat actuel de notre formulaire
 et aussi l'erreur en cas des informations erronées*/}

const Login = () => {

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(false);
    const  router = useRouter();

    {/** Au premier click pour etre sur la page admin va nous conduire directement sur la page login
    et [AXIOS POST] Comme avec les autres clients HTTP, va nous permettre de créer 
   des requêtes avec la méthode POST ,  en recuperant les informations de la connexions */}
    const handleClick = async () =>{
        try {
            await axios.post("http://localhost:3000/api/login", {
                username, 
                password
            });
            //Direction après la connexion
            router.push("/admin")
        } catch (error) {
             setError(true)
        }
    }

    {/** Formulaire des saisies d'informations */}
    return(
        <div className={styles.container}>
          <div className={styles.wrapper}>
              <h1>Administrateur</h1>
              <input
          placeholder="username"
          className={styles.input}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="password"
          type="password"
          className={styles.input}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleClick} className={styles.button}>
          Se connecter
        </button>
        {/** condition si les informations ne sont pas exacts */}
        {error && <span className={styles.error}>Information eronnées!</span>}
          </div>
        </div>
    )
}

export default Login