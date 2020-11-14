import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrder } from '../actions/orderActions';

function OrderScreen(props){

    const userSignin = useSelector(state=>state.userSignin);
    const {userInfo} = userSignin;

    const cart = useSelector(state => state.cart);
    const {shippingAddress, payment, cartItems} = cart;


    const orderId = props.match.params.id;

    const orderDetails = useSelector(state=>state.orderDetails);
    const {loading, order, error} = orderDetails;


    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(detailsOrder(orderId));
        return () => {

        };
    }, [dispatch, orderId]);


    return <div className="cart-page">
        {loading &&<div className="loading">Loading...</div>}
        {error &&<div className="error">{error}</div>}
    <div className="Order">
        <div className="cart-sidebar"></div>
        <div className="Order-info">
            <div>
                <h3>Order {orderId}</h3>
                
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
        <div className="Order-action">
     
        </div>
    </div>
    </div>

}

export default OrderScreen;