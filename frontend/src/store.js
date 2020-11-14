import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import { productDetailsReducer, productListReducer, previousProductReducer, productSaveReducer, productDeleteReducer } from './reducers/productReducers';
import Cookie from 'js-cookie';
import { cartReducer } from './reducers/cartReducers';
import thunk from 'redux-thunk';
import { userSigninReducer, userRegisterReducer } from './reducers/userReducers';
import { orderCreateReducer, orderDetailsReducer } from './reducers/orderReducers';

const cartItems = Cookie.getJSON("cartItems") || [];
const shippingAddress = Cookie.getJSON("shippingAddress") || {};
const previousItems = Cookie.getJSON("previousItems") || [];

const userInfo = Cookie.getJSON("userInfo") || null;

const initialState = { cart: {cartItems, shippingAddress: {shippingAddress}, payment:{}, prices: {}}, previous: {previousItems}, userSignin: {userInfo} };

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,

    productSave: productSaveReducer,
    productDelete: productDeleteReducer,

    previous: previousProductReducer,

    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,

    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,

    cart: cartReducer
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;