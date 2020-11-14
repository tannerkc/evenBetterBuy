import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import { savePrices } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';

function CheckoutScreen(props){

    const userSignin = useSelector(state=>state.userSignin);
    const {userInfo} = userSignin;

    const cart = useSelector(state => state.cart);
    const {cartItems, shippingAddress, payment, prices} = cart;

    console.log(prices)

    const orderCreate = useSelector(state => state.orderCreate);
    const {loading, success, error, order} = orderCreate;

    if(!shippingAddress.address){
        props.history.push("/shipping");
    }else if(!payment.paymentMethod){
        props.history.push("/payment");
    }

    const toPrice = (num) => Number(num.toFixed(2));

    cart.itemsPrice = toPrice(
        cartItems.reduce((a, c) => a + c.price*c.qty, 0)
    );
    cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
    cart.taxPrice = toPrice(0.15*cart.itemsPrice);

    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

    const dispatch = useDispatch();

    const checkoutHandler = () =>{
        // dispatch(savePrices(itemsPrice, shippingPrice, taxPrice, totalPrice));
        dispatch(createOrder({...cart, orderItems: cartItems}))
    };


    useEffect(() => {
        if(success){
            props.history.push('/order/'+order._id);
            dispatch({type: ORDER_CREATE_RESET});
        }
        
        return () => {

        };
    }, [dispatch, order, props.history, success]);


    return <div className="cart-page">
        <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>

    <div className="checkout">
        <div className="cart-sidebar"></div>
        <div className="checkout-info">
            <div>
                <h3>Shipping</h3>
                <div> 
                    <strong>Name: </strong>
                    {userInfo.name} <br />
                    <strong>Address: </strong>
                    {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.zipCode}, {shippingAddress.country}
                </div>
            </div>
            <div>
                <h3>Payment</h3>
                <div> 
                    <strong>Method: </strong>{payment.paymentMethod}
                </div>
            </div>
            <div>
            <ul className="cart-list-container">
                <li>
                    <h3>Order Items</h3>
                </li>
                {
                    cartItems.map( item =>
                        <li key={item.product}>
                            <div className="cart-image">
                                <img src={item.image} alt="product" />
                            </div>
                            <div className="cart-name">
                                <div><Link className="cart-link" to={"/product/"+item.product}> {item.name} </Link></div>
                                <div>
                                    Qty: {item.qty} <small>(x ${item.price})</small>
                                </div>
                            </div>
                            <div className="cart-price">
                                ${item.price}
                            </div>
                        </li>
                    )
                }
            </ul>
            </div>
        </div>
        <div className="checkout-action">
               <ul>
                   <li>
                       <button className="button primary full-width" onClick={checkoutHandler}>
                       {
                       loading ? <span>Completing Order...</span>
                       :
                       <span>Place Order</span>
                        }
                       </button>
                   </li>
                   <li>
                       <h3>
                           Order Summary
                       </h3>
                   </li>
                   <li>
                       <div>Items</div>
                       <div>${cart.itemsPrice.toFixed(2)}</div>
                   </li>
                   <li>
                       <div>Shipping</div>
                       <div>${cart.shippingPrice.toFixed(2)}</div>
                   </li>
                   <li>
                       <div>Tax</div>
                       <div>${cart.taxPrice.toFixed(2)}</div>
                   </li>
                   <li>
                       <div>Order Total</div>
                       <div>${cart.totalPrice.toFixed(2)}</div>
                   </li>
                   <li>
                       <button className="button primary full-width" onClick={checkoutHandler}>
                       {
                       loading ? <span>Completing Order...</span>
                       :
                       <span>Place Order</span>
                        }
                           
                           </button>
                   </li>
                   {error && <div>{error}</div>}
               </ul>

        </div>
    </div>
    </div>

}

export default CheckoutScreen;