import { createSlice } from "@reduxjs/toolkit";


{/** Va nous permettre  de gerer notre portefeuille  de commande  en gerant les prix du produits choisies 
et les changements que nous allons effectués avant de finaliser a commande
tels que la quantités dans l'ajout du produits ou soit l'annulation */}
const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity:0,
        total: 0,
    },
    reducers:{
        addProduct:(state, action)=>{
            state.products.push(action.payload);
            state.quantity += 1;
            state.total += action.payload.price * action.payload.quantity;
        },
        reset:(state)=>{
            state.products = [];
            state.quantity = 0;
            state.total = 0;
        }
    }
});

{/** et cela sera envoyé  à notre reducer , lorsque la facture sera gérér recuperer les infos exacts */}
export const {addProduct, reset} = cartSlice.actions;
export default cartSlice.reducer