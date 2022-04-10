import '../styles/globals.css';
import Layout from '../components/Layout';
import boutique from '../redux/boutique';
import { Provider } from "react-redux";

{/** Le Component est la page vue qui sera rendue , autour de notre Layout 
 Le pageProps prop est les accessoires que chaque page recevra lors du rendu*/}

function MyApp({ Component, pageProps }) {
  return (
  <Provider store={boutique}> 
    <Layout>
     <Component {...pageProps} />
    </Layout>
  </Provider> 
  );
}
{/** c'est un bon moyen de créer des mises en page personnalisées sans avoir à envelopper 
chaque composant de page dans votre /pagesrépertoire : Next.js utilise ce composant pour initialiser les pages.*/}
export default MyApp;
