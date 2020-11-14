import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Rating from '../components/Rating';

function HomeScreen(props){

    const productList = useSelector(state => state.productList);
    const { products, loading, error } = productList;

    const previous = useSelector(state => state.previous);
    const {previousItems} = previous;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProducts());
        return () => {

        };
    }, []);

    return loading? <div className="loading">Loading...</div> :
    error? 
    <div className="error-container">
      <h2>It seems our server is taking a break... </h2>
      <p>Sorry for the inconvenience, it'll be back up shortly.</p>
    </div> 
    :
    <ul className="products">
      {
        previousItems.length !== 0 &&
        <div className="previous-item-bar">
          <h3>Items you've viewed at recently</h3>
          <ul>
          {
        previousItems.map( item =>
            <li key={item.product}>
                <div className="previous-item-image">
                    <img src={item.image} alt="product" />
                </div>
                <div className="previous-item-name">
                    <div><Link className="previous-item-link" to={"/product/"+item.product}> {item.name} </Link></div>
                    <div className="previous-item-rating">
                    <Rating rating={item.rating} numReviews={item.numReviews}></Rating>                                 
                    </div>
                    

                    <div className="previous-item-price">
                    ${item.price}
                    </div>
                </div>
                
            </li>
        )
        }
        </ul>
        </div>
      }
      <h2>Trending</h2>
    {
      products.map(product =>
        <li key={product._id}>
          <div className="product">
          <Link className="product-name" to={'/product/' + product._id}><img className="product-image" src={product.image} alt="product" /></Link>
          <Link className="product-name" to={'/product/' + product._id}>{product.name}</Link>
              <div className="product-brand">{product.brand}</div>
              <div className="product-price">${product.price}</div>
              {/* <div className="product-rating">{product.rating} ({product.numReviews} Reviews)</div> */}
              <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
          </div>
      </li>
        )
    }
      
  </ul>
}

export default HomeScreen