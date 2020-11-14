import Axios from "axios";
import { PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, ADD_TO_PREVIOUS, PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_SUCCESS, PRODUCT_SAVE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL } from "../constants/productConstants";
import Cookie from "js-cookie";

const listProducts = () => async (dispatch) => {
    try{
        dispatch({ type: PRODUCT_LIST_REQUEST });
        const {data} = await Axios.get("/api/products");
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
    }
    catch(error){
        dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message })
    }
    
}

const saveProduct = (product) => async (dispatch, getState) =>{
    try {
        dispatch({type: PRODUCT_SAVE_REQUEST, payload: product});
        const {userSignin:{userInfo}} = getState();
        if(product._id){
            const {data} = await Axios.put('/api/products/' + product._id, product, {headers:{
                    'Authorization': 'Bearer ' + userInfo.token
                }
            });
        dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
    }
        else{
            const {data} = await Axios.post('/api/products', product, {headers:{
                    'Authorization': 'Bearer ' + userInfo.token
                }
            });
        dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
    }
        
    } catch (error) {
        dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message })
    }
}

const detailsProduct = (productId) => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST, payload: productId});
        const {data} = await Axios.get("/api/products/"+productId);
        dispatch({
            type:PRODUCT_DETAILS_SUCCESS, payload:data
        });
    } catch (error) {
        dispatch({type:PRODUCT_DETAILS_FAIL, payload:error.message});
    }
}

const deleteProduct = (productId) => async (dispatch, getState) => {
    try {
        const {userSignin:{userInfo}} = getState();

        dispatch({type: PRODUCT_DELETE_REQUEST, payload: productId});
        const {data} = await Axios.delete("/api/products/"+productId, {
            headers: {
                Authorization: 'Bearer ' + userInfo.token
            }
        });
        dispatch({
            type:PRODUCT_DELETE_SUCCESS, payload:data, success: true
        });
    } catch (error) {
        dispatch({type:PRODUCT_DELETE_FAIL, payload:error.message});
    }
}

const addToPrevious = (productId) => async (dispatch, getState) =>{
    try {
        // console.log(productId);
        const {data} = await Axios.get("/api/products/"+productId);
        dispatch({
            type: ADD_TO_PREVIOUS, payload:{ 
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            rating: data.rating,
            numReviews: data.numReviews
         }
        });
        const {previous:{previousItems}} = getState();
        Cookie.set("previousItems", JSON.stringify(previousItems));
    } catch (error) {
        
    }
}

export {
    listProducts, detailsProduct, addToPrevious, saveProduct, deleteProduct
}