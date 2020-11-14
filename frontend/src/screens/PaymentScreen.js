import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePayment } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

function PaymentScreen(props){


    const cart = useSelector(state => state.cart);
    const {shippingAddress,} = cart;


    if(!shippingAddress.address){
        props.history.push("/shipping");
    }

    const [paymentMethod, setPaymentMethod] = useState('');


    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePayment({paymentMethod}));
        props.history.push("checkout");
    }


    return <div>
        <CheckoutSteps step1 step2 step3></CheckoutSteps>
    <div className="form">
            <form onSubmit={submitHandler}>
                <ul className="form-container" id="secondary-form">
                    <li>
                        <h2>Payment</h2>
                    </li>
                    <li>
                        <div>
                            <input type="radio" name="paymentMethod" id="paymentMethod" value="paypal" onChange={(e) => setPaymentMethod(e.target.value)} />

                            <label htmlFor="paymentMethod">
                                PayPal
                            </label>
                        </div>
                    </li>
                    
                    <li>
                        <button type="submit" className="button primary">Continue</button>
                    </li> 
                </ul>
            </form>
        </div>
    </div>
    
}

export default PaymentScreen;