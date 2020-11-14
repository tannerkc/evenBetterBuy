import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';

function RegisterScreen(props){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    const userRegister = useSelector(state => state.userRegister);
    const {loading, userInfo, error} = userRegister;

    const dispatch = useDispatch();

    const redirect = props.location.search?props.location.search.split("=")[1]:'/';

    useEffect(() => {
        if(userInfo){
            props.history.push(redirect);
        }
        return () => {
            
        };
    }, [userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(register(name, email, password));
    }


    return <div className="form">
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h2>Create an account</h2>
                </li>
                <li>
                    {error && <span className="error">{error}</span>}
                </li>
                <li>
                    <label htmlFor="name">
                        Name
                    </label>
                    <input type="name" name="name" id="name" onChange={(e) => setName(e.target.value)} />
                </li>
                <li>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
                </li>
                <li>
                    <label htmlFor="password">
                        Password
                    </label>
                    <input type="password" id="password" name="password" onChange={(e)=>setPassword(e.target.value)} />
                </li>
                <li>
                    <label htmlFor="rePassword">
                        Verify Password
                    </label>
                    <input type="password" id="rePassword" name="rePassword" onChange={(e)=>setRePassword(e.target.value)} />
                </li>
                <li>
                    <button type="submit" className="button primary">
                    {
                    loading ? 
                        <span>Sending info to database...</span>
                    :
                        <span>Continue</span>
                    }
                        </button>
                </li> 
                <li>
                    Already have an account?
                </li>
                <li>
                    <Link to={redirect === "/" ? "signin": "signin?redirect="+redirect}  id="link-to-register">Sign in here</Link>
                </li>
            </ul>
        </form>
    </div>
}

export default RegisterScreen;