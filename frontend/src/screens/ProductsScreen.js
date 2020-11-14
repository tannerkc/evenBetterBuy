import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listProducts, saveProduct, deleteProduct } from '../actions/productActions';
import { productListReducer } from '../reducers/productReducers';

function ProductsScreen(props){

    const [modelVisible, setModelVisible] = useState(false);

    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState('');
    const [numReviews, setNumReviews] = useState('');

    const productSave = useSelector(state => state.productSave);
    const productDelete = useSelector(state => state.productDelete);
    const productList = useSelector(state => state.productList);

    const {loading: loadingSave, success: successSave, error: errorSave} = productSave;
    const {loading: loadingDelete, success: successDelete, error: errorDelete} = productDelete;
    const {loading, products, error} = productList;

    const dispatch = useDispatch();

    useEffect(() => {
        if(successSave){
            setModelVisible(false);
        }
        dispatch(listProducts());
        return () => {
            
        };
    }, [successSave, successDelete]);

    const openModel = (product) => {
        setModelVisible(true);
        setId(product._id);
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
        setRating(product.rating);
        setNumReviews(product.numReviews);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveProduct({
            _id: id,
            name, price, image, brand, category, countInStock, description, rating, numReviews
        }));
    }

    const deleteHandler = (product) => {
        dispatch(deleteProduct(product._id));
    }


    return <div className="content content-margined">

        <div className="product-header">
            <h3>Products</h3>
            <button className="button primary" onClick={() => openModel({})}>Add Product</button>
        </div>

        {
            modelVisible &&
            <div className="form">
            <form onSubmit={submitHandler}>
                <ul className="form-container" id="secondary-form">
                    <li>
                        <h2>Create Product</h2>
                    </li>
                    <li>
                        {errorSave && <span className="error">Couldn't create product</span>}
                    </li>
                    <li>
                        <label htmlFor="name">
                            Product Name
                        </label>
                        <input value={name} type="text" name="name" id="name" onChange={(e) => setName(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor="price">
                            Price
                        </label>
                        <input value={price} type="text" id="price" name="price" onChange={(e)=>setPrice(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor="image">
                            Image
                        </label>
                        <input value={image} type="text" id="image" name="image" onChange={(e)=>setImage(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor="brand">
                            Brand
                        </label>
                        <input value={brand} type="text" id="brand" name="brand" onChange={(e)=>setBrand(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor="category">
                            Category
                        </label>
                        <input value={category} type="text" id="category" name="category" onChange={(e)=>setCategory(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor="countInStock">
                            Stock
                        </label>
                        <input value={countInStock} type="text" id="countInStock" name="countInStock" onChange={(e)=>setCountInStock(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor="description">
                            Description
                        </label>
                        <textarea value={description} id="description" name="description" onChange={(e)=>setDescription(e.target.value)} ></textarea>
                    </li>

                    <li>
                        <button type="submit" className="button primary">
                        {
                        loadingSave ? 
                            <span>Sending product to database...</span>
                        :
                        id ?
                            <span>Update</span>
                        :
                            <span>Continue</span>
                        }
                            </button>
                        </li> 
                        <li>
                            <button className="button" onClick={() => setModelVisible(false)}>Close</button>
                        </li>
                    </ul>
                </form>
            </div>
        }
        
        <div className="product-list">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Brand</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td>
                                <button className="button edit" onClick={() =>openModel(product)}>Edit</button>
                                {' '}
                                <button className="button delete" onClick={() => deleteHandler(product)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>

    </div>
}

export default ProductsScreen;