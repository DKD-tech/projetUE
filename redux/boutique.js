import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

{/** Nous utiliser redux  va nous permettre 
la configuration du magasin de notre site avec les api de paiement, la création de réducteurs, 
la logique de mise à jour immuable*/}
export default configureStore({
    reducer: {
        cart: cartReducer,
    },
});