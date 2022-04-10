import Head from "next/head";
import axios from 'axios'
import Image from "next/image";
import Featured from "../components/Featured";
import PizzaList from "../components/PizzaList";
import styles from "../styles/Home.module.css";
import AjoutButton from "../components/AjoutButton";
import Add from "../components/Add";
import { useState } from "react";
import Categories from "../components/Categories";

{/** index.js dans le dossier pages est celle qui est lancée lorsque nous essayons d'ouvrir notre nouvelle site
 (Rapidos Fast Delivery).  qui va contenir nos components que l'on souhaite afficher en premier lieu*/}
 {/** index.js qui est automatiquement acheminée vers le point de départ de notre  application comme /  
 cela permet de définir le point de départ de nos itinéraires*/}

export default function Home({pizzaList, admin}) {
  const [close, setClose] = useState(true);
  return (
    <div className={styles.container}>
      {/** nom de  Entete de notre site*/}
      <Head>
        <title>Rapidos Fast - Delivery Food</title>
        <meta name="description" content="Best pizza shop in town" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/** Represente la banniere  de notre site après la navbar */}
      <Featured/>
      {/** nous allons tester cette fonctionnalité d'ajout des nouvelles produits pas encore finaliser */}
      {/**admin && <AjoutButton setClose={setClose}/>*/}
      <Categories/>
      {/** Listes des produits */}
      <PizzaList pizzaList={pizzaList}/>
      {!close && <Add setClose={setClose} />}
    </div>
  );
}
{/** En termes simples, getServerSideProps permet à une page de s'afficher côté serveur. 
 getServerSideProps rend notre page côté client côté serveur et renvoie nos produits(interface index.js). 
Cela signifie que getServerSideProps pré-rend la page à chaque requête en utilisant les données qu'il récupère du serveur de notre mongodb
(http://localhost:3000/api/products)  */}
{/**  utilisé getServerSideProps dans le rendu côté serveur. */}
export const getServerSideProps = async (ctx) =>{
  {/** notre cookies de connexion */}
  const monCookie = ctx.req?.cookies || "";

  {/** creation d'un admin */}
  let admin = false;

  {/** verification des données de la connexion  a c haque fois que nous voulons utiliser l'interface
admin*/}

  if (monCookie.token === process.envTOKEN) {
    admin = true;
  }
  {/** Axios est un simple client HTTP basé sur une promesse pour le navigateur et node.js.
   Axios fournit une bibliothèque simple à utiliser dans un petit package avec une interface très extensible. */}
  const res = await axios.get("http://localhost:3000/api/products");
  return{
    props:{
      pizzaList:res.data,
      admin
    }
  }
};
