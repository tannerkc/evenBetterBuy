import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToPrevious, detailsProduct } from '../actions/productActions';
import Rating from '../components/Rating';

function ProductScreen(props){
    const [qty, setQty] = useState(1);
    const productDetails = useSelector(state => state.productDetails);
    const {product, loading, error} = productDetails;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailsProduct(props.match.params.id));
        dispatch(addToPrevious(props.match.params.id));
        return () => {
            
        };
    }, []);

    const handleAddToCart = () =>{
        props.history.push("/cart/"+props.match.params.id + "?qty="+qty)
    }

    return <div className="product-page">
        {/* <div className="back-to-result">
            <Link to="/"> Keep Looking</Link>
        </div> */}
        {loading? <div className="loading">Loading...</div> :
        error? 
        <div className="error-container">
        <h2>It seems our server is taking a break... </h2>
        <p>Sorry for the inconvenience, it'll be back up shortly.</p>
        </div> 
        :
        (
        <div className="details">
            <div className="details-image">
                <img src={product.image} alt="product"></img>
            </div>
            <div className="details-info">
                <ul>
                    <li>
                        <p>{product.brand}</p>
                        <h4>{product.name}</h4>
                    </li>
                    <li className="product-rating">
                    <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
                    </li>
                    <li className="details-price">
                        Price: <b>${product.price} </b>
                    </li>
                    <li>
                        <h5>Description</h5>
                        <div>
                            {product.description}
                        </div>
                    </li>
                </ul>
            </div>
            <div className="details-action">
                <ul>
                    <li>
                        Price: <b>${product.price}</b>
                    </li>
                    {product.countInStock > 0 &&
                    <li>
                        <span className="product-status">In Stock</span>
                    </li>}
                    <li>
                        Qty: <select value={qty} onChange={(e) => {setQty(e.target.value)}}>
                            {[...Array(product.countInStock).keys()].map(x=>
                                <option key={x+1} value={x+1}>{x+1}</option>
                                )}
                        </select>
                    </li>
                    <li>
                        {product.countInStock > 0 ?
                        <button onClick={handleAddToCart} className="button primary">Add to Cart</button> :
                        <span>
                            <div className="product-status out-of-stock">Sorry, we ran out</div><center><div>but we're getting more</div></center>
                        </span>
                         }
                    </li>
                </ul>
            </div>
            
        </div>
        )}
        
    </div>
}

export default ProductScreen