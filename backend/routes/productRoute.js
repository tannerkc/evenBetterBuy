import express from 'express';
import Product from '../models/productModel';
import { isAuth, isAdmin } from '../util';

const router = express.Router();

router.get("/", async (req, res) => {
    const products = await Product.find({});
    res.send(products);
});


router.get("/:id", async (req, res) => {
    const product = await Product.findOne({_id:req.params.id});
    if(product){
        res.send(product); 
    }
    else{
        res.status(404).send({message:"This Product Doesn't Exist"});
    }
});

router.post("/", isAuth, isAdmin, async(req, res) =>{
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        brand: req.body.brand,
        category: req.body.category,
        countInStock: req.body.countInStock,
        description: req.body.description,
        rating: req.body.rating,
        numReviews: req.body.numReviews
    });
    const newProduct = await product.save();

    if(newProduct){
        return res.status(201).send({msg:'New Product Created', data: newProduct})
    }
    return res.status(500).send({msg:'Could not create product'})
});

router.put("/:id", isAuth, isAdmin, async (req, res) =>{
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if(product){
            product.name = req.body.name;
            product.price = req.body.price;
            product.image = req.body.image;
            product.brand = req.body.brand;
            product.category = req.body.category;
            product.countInStock = req.body.countInStock;
            product.description = req.body.description;
            product.rating = req.body.rating;
            product.numReviews = req.body.numReviews;
    
            const updatedProduct = await product.save();
    
            if(updatedProduct){
                return res.status(200).send({msg:'Product Updated', data: updatedProduct})
            }
        }
        
        return res.status(500).send({msg:'Could not update product'})
    } catch (error) {
         console.log(error)
    }

});

router.delete("/:id", isAuth, isAdmin, async(req, res) =>{
    const deletedProduct = await Product.findById(req.params.id);

    if(deletedProduct){
        await deletedProduct.remove();
        res.send({message: "Product Deleted"})
    }
    else{
        res.send("Couldn't delete the product. Try again later.")
    }
});


export default router;