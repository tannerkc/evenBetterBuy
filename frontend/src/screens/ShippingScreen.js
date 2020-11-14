import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShipping } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

function ShippingScreen(props){

    const userSignin = useSelector(state=>state.userSignin);
    const {userInfo} = userSignin;

    if(userInfo === null){
        props.history.push("/signin");
    }

    const [fullName, setName] = useState('');

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [country, setCountry] = useState('');


    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShipping({fullName, address, city, zipCode, country}));
        props.history.push("payment");
    }


    return <div>
        <CheckoutSteps step1 step2></CheckoutSteps>
    <div className="form">
            <form onSubmit={submitHandler}>
                <ul className="form-container" id="secondary-form">
                    {
                        userInfo &&
                        <input type="hidden" onChange={(e) => setName(e.target.value)} value={userInfo.name}></input>
                    }
                    
                    <li>
                        <h2>Shipping</h2>
                    </li>
                    <li>
                        <label htmlFor="address">
                            Address
                        </label>
                        <input type="text" name="address" id="address" onChange={(e) => setAddress(e.target.value)} />
                    </li>

                    <li>
                        <label htmlFor="city">
                            City
                        </label>
                        <input type="text" name="city" id="city" onChange={(e) => setCity(e.target.value)} />
                    </li>

                    <li>
                        <label htmlFor="zipCode">
                            ZIP Code
                        </label>
                        <input type="text" name="zipCode" id="zipCode" onChange={(e) => setZipCode(e.target.value)} />
                    </li>

                    <li>
                        <label htmlFor="country">
                            Country
                        </label>
                        <input type="text" name="country" id="country" onChange={(e) => setCountry(e.target.value)} />
                    </li>
                    
                    <li>
                        <button type="submit" className="button primary">Continue</button>
                    </li> 
                </ul>
            </form>
        </div>
    </div>
    
}

export default ShippingScreen;