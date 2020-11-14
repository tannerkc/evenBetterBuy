import { ADD_TO_CART, CART_REMOVE_ITEM, CART_SAVE_SHIPPING, CART_SAVE_PAYMENT, CART_EMPTY, CART_SAVE_PRICES } from "../constants/cartConstants";

function cartReducer(state={cartItems: [], shipping:{}, payment:{}, prices: {}}, action){
    switch(action.type){
        case ADD_TO_CART:
            const item = action.payload;
            const product = state.cartItems.find(x=>x.product === item.product);
            if(product){
                return {
                    cartItems: 
                    state.cartItems.map(x=>x.product === product.product ? item: x)
                };
            }
            return { cartItems: [...state.cartItems, item]};

        case CART_REMOVE_ITEM:
            return { 
                cartItems: state.cartItems.filter(x=>x.product !== action.payload)
            };

        case CART_SAVE_SHIPPING:
            return {
                ...state,
                shippingAddress: action.payload
            };
        case CART_SAVE_PAYMENT:
            return {
                ...state,
                payment: action.payload
            };
        case CART_SAVE_PRICES:
            return {
                ...state,
                prices: action.payload
            };
        case CART_EMPTY:
            return { ...state, cartItems: [] };
        default:
            return state
            
    }
}

export {cartReducer}