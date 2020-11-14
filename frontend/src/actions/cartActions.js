import Axios from "axios";
import Cookie from "js-cookie";
import { ADD_TO_CART, CART_REMOVE_ITEM, CART_SAVE_SHIPPING, CART_SAVE_PAYMENT, CART_SAVE_PRICES } from "../constants/cartConstants";

const addToCart = (productId, qty) => async (dispatch, getState) =>{
    try {
        const {data} = await Axios.get("/api/products/"+productId);
        dispatch({
            type: ADD_TO_CART, payload:{ 
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
         }
        });
        const {cart:{cartItems}} = getState();
        Cookie.set("cartItems", JSON.stringify(cartItems));
    } catch (error) {
        
    }
}
const removeFromCart = (productId) => (dispatch, getState) =>{
    try {
        dispatch({type: CART_REMOVE_ITEM, payload: productId});

        const {cart:{cartItems}} = getState();
        Cookie.set("cartItems", JSON.stringify(cartItems));  
    } catch (error) {
        
    }
}

const saveShipping = (data) => (dispatch) =>{
    dispatch({type: CART_SAVE_SHIPPING, payload: data});
    Cookie.set('shippingAddress', JSON.stringify(data));
}

const savePayment = (data) => (dispatch) =>{
    dispatch({type: CART_SAVE_PAYMENT, payload: data});
}

const savePrices = (data) => (dispatch) =>{
    dispatch({type: CART_SAVE_PRICES, payload: {
        itemsPrice: data.itemsPrice,
        shippingPrice: data.shippingPrice,
        taxPrice: data.taxPrice,
        totalPrice: data.totalPrice,
    }});
}

export {addToCart, removeFromCart, saveShipping, savePayment, savePrices}