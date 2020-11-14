import React from 'react';
import { useSelector } from 'react-redux';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import './App.css';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import ProductsScreen from './screens/ProductsScreen';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import OrderScreen from './screens/OrderScreen';

function App() {

    const userSignin = useSelector(state=>state.userSignin);
    const {userInfo} = userSignin;

  const openMenu = () =>{
    document.querySelector(".sidebar").classList.add("open");
    document.querySelector(".overlay").classList.add("open");
  }
  const closeMenu = () =>{
    document.querySelector(".sidebar").classList.remove("open");
    document.querySelector(".overlay").classList.remove("open");
  }
  return (
      <BrowserRouter>
    <div className="grid-container">
        <header className="header">
            <div className="brand">
                <button onClick={openMenu}>
                    &#9776;
                </button>
                <Link to="/">Even Better Buy.</Link>
            </div>
            <div className="header-links">
                <Link to="/cart">Cart</Link>
                {
                    userInfo ? 
                    <Link to="/profile">{userInfo.name}</Link>
                    :
                    <Link to="/signin">Sign In</Link>
                }
            </div>
        </header>

        <aside className="sidebar">
            <header className="header">
                <h3>Categories</h3>
                <button onClick={closeMenu}>X</button>
            </header>
            <ul>
                <h4>Trending</h4>
                <li>
                    <a href="#">New Arrivals</a>
                </li>
                <li>
                    <a href="#">Best Sellers</a>
                </li>
            </ul>
            <ul>
                <h4>Departments</h4>
                <li>
                    <a href="#">Pants</a>
                </li>
                <li>
                    <a href="#">Shirts</a>
                </li>
            </ul>
        </aside>

        <main className="main">
            <div className="content">
                <Route path="/order/:id" component={OrderScreen} />
                <Route path="/checkout" component={CheckoutScreen} />
                <Route path="/payment" component={PaymentScreen} />
                <Route path="/shipping" component={ShippingScreen} />
                <Route path="/products" component={ProductsScreen} />
                <Route path="/signin" component={SigninScreen} />
                <Route path="/register" component={RegisterScreen} />
                <Route path="/product/:id" component={ProductScreen} />
                <Route path="/cart/:id?" component={CartScreen} />
                <Route path="/" exact={true} component={HomeScreen} />
                
            </div>
        </main>

    <div className="overlay" onClick={closeMenu}></div>

    <footer className="footer">
        All rights reserved.
    </footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
