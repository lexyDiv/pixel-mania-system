const router = require('express').Router();
const AddProductBtn = require('../../components/products/AddProductBtn');
const ProductAbout = require('../../components/products/ProductAbout');
const Products = require('../../components/products/Products');
const FormAddProduct = require('../../components/products/FormAddProduct');
const FormUpdateProduct = require('../../components/products/FormUpdateProduct');
const MyProductItem = require('../../components/products/MyProductItem');
const MyProductItemDelMee = require('../../components/products/MyProductItemDelMee');
const MyProducts = require('../../components/products/MyProducts');
const { Product } = require('../../db/models');
const { User } = require('../../db/models');
const { Comment } = require('../../db/models');
const { Like } = require('../../db/models');
const { Favorite } = require('../../db/models');
const createHtml = require('../../middleware/createHtml');

router.route('/:id')
.post(async (req, res) => {
    const { id } = req.body;
    const { user } =req.session;
    if(user){
        try {
            const newLike = await Like.create({user_id: user.id, product_id: id});
    
            if(newLike){
                res.json({message: 'ok'});
            }
            else{
                res.json({message: 'fig!'});
            }
        } catch (err) {
            res.json({message: err.message});
        }
    }
})

module.exports = router;