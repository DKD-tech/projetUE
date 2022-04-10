import styles from "../styles/Cart.module.css";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import axios from "axios";
//import Router from "next/router";
import { useRouter } from "next/router";
import { reset } from "../redux/cartSlice";
import OrderDetail from "../components/OrderDetail";

{/** Cette fichier va se charger de la recuperation de la commande afin de proceder au paiement selon ses choix */}
const Cart =  () => {
    // This values are the props in the UI
    const cart = useSelector(state =>state.cart)
    // Tant qu'il n'y aura pas de click les modes de paiements seront en defauts : false
    const [open, setOpen] = useState(false);
    const [cash, setCash] = useState(false);
    const amount = cart.total;
    const currency = "USD";
    const style = { layout: "vertical" };
    const dispatch = useDispatch();
    const router = useRouter();
 {/** Après la validation ils nous envoies directements sur la page de commande creer en recuperant les informations
  de la commande sinon erreur */}
    const createOrder = async (data) => {
        try{
          const res = await axios.post("http://localhost:3000/api/orders", data);
          res.status === 201 &&  router.push(`/orders/${res.data._id}`);
          dispatch(reset())
        }catch(error){
            console.log(error);
        }
    };
// Custom component to wrap the PayPalButtons and handle currency changes
const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: currency,
            },
        });
    }, [currency, showSpinner]);


    return (<>
            { (showSpinner && isPending) && <div className="spinner" /> }
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[amount, currency, style]}
                fundingSource={undefined}
                createOrder={(data, actions) => {
                    return actions.order
                        .create({
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: currency,
                                        value: amount,
                                    },
                                },
                            ],
                        })
                        .then((orderId) => {
                            // Your code here after create the order
                            return orderId;
                        });
                }}
                onApprove={function (data, actions) {
                    return actions.order.capture().then(function (details){
                        const shipping = details.purchase_units[0].shipping;
                        createOrder({
                            customer:shipping.name.full_name, 
                            address:shipping.address.address_line_1,
                            total: cart.total,
                            method: 1,
                        });
                    });
                }}
            />
        </>
    );
};
    {/** Formulaire de recuperation de la commandes */}
    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <table className={styles.table}>
                    <tbody>
                  <tr className={styles.trTitle}>
                    <th>Produit</th>
                    <th>Nom</th>
                    <th>Supplements</th>
                    <th>Prix</th>
                    <th>Quantité</th>
                    <th>Total</th>
                  </tr>
                  </tbody>
                  <tbody>
                  {cart.products.map((product) => (
                       <tr className={styles.tr} key={product._id}>
                       <td>
                           <div className={styles.imgContainer}>
                               <Image 
                               src={product.img} 
                               layout="fill" 
                               objectFit="cover" 
                               alt=""
                               />
                           </div>
                       </td>
                       <td>
                           <span className={styles.name}>{product.title}</span>
                       </td>
                       <td>
                           <span className={styles.extras}>
                               {product.extras.map(extras=>(

                                   <span key={extras._id}>{extras.text}, </span>
                               ))}
                               Double ingredient, sauce epicé
                           </span>
                       </td>
                       <td>
                          <span  className={styles.price}>{product.price}€</span>
                       </td>
                       <td>
                           <span className={styles.quantity}>{product.quantity}</span>
                       </td>
                       <td>
                           <span className={styles.total}>{product.price * product.quantity}€</span>
                       </td>
                       </tr>
                           
                  ))}
                  </tbody>
                </table>
            </div>
            <div className={styles.right}>
                <div className={styles.wrapper}>
                    <h2 className={styles.title}>CART TOTAL</h2>
                    <div className={styles.totalText}>
                        <b className={styles.totalTextTitle}> Sous-Total:</b>{cart.total}€
                    </div>
                    <div className={styles.totalText}>
                        <b className={styles.totalTextTitle}>Reduction:</b>0.00€
                    </div>
                    <div className={styles.totalText}>
                        <b className={styles.totalTextTitle}>Total:</b>{cart.total}€
                    </div>
                    {open ? (
                        <div className={styles.payementMethodes}>
                            <button className={styles.payButton} onClick={()=> setCash(true)}>Paiement à la Livraison</button>
                         {/** L'Url pour notre transactions , information paypal developper (store) - API business*/}
                          <PayPalScriptProvider
                          options={{
                              "client-id": 
                              "AeIzfOmTAJd8kTAxdYdF77m_AcGs-TrhC25OWvh9Q4eVDnK07oW49SBUoiTDCJzrQgIuzp-ibpbswYUl",
                              components: "buttons",
                              currency: "USD",
                              "disable-funding": "credit,card,p24",
                          }}
                        
                      >
              
                          <ButtonWrapper
                              currency={currency}
                              showSpinner={false}
                          />
                      </PayPalScriptProvider>
                      </div>
                    ) : (
                        <button onClick={() => setOpen(true)} className={styles.button}>PAYER MAINTENANT!</button>      
                    )}
                </div>
            </div>
            {cash && (
                <OrderDetail total={cart.total} createOrder={createOrder} />
            )}
        </div>
    );
};

export default Cart;