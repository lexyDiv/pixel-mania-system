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

router.route('/')
.post( async (req, res) => {
    const {name, info, image, price, have} = req.body;
    const { user } = req.session;
    if(!name || !info || !image || !price || !have) {res.json({message: 'заполните все поля!'}); return};
    if(user){
        try {
          const newProduct = await Product.create({name, info, image, user_id: user.id, price, have}); 
          const product = await Product.findOne({where: {id: newProduct.id},
            include: [{model: User}, {model: Comment}, {model: Like}]
        }); 

        const htmlProduct = createHtml(MyProductItemDelMee, {product});
        const btn = createHtml(AddProductBtn);
        res.json({message: 'ok', htmlProduct, btn});
        } catch (err) {
          res.json({message: err.message});  
        }
    }
})

router.route('/product/:id')
.delete( async (req, res) => {
    const { id } = req.params;
    const { user } = req.session;
    if(user){
  try {
    const product = await Product.findOne({where: {id}});
    if(product && product.user_id === user.id){
     await Comment.destroy({where: {product_id: product.id}});
     await Like.destroy({where: {product_id: product.id}});
     await Favorite.destroy({where: {product_id: product.id}});
     await  product.destroy();
        res.json({message: 'ok'});
    }
    else{
        res.json({message: 'что-то пошло не так!'});
    }
  } catch (err) {
    res.json({message: err.message});
  }
}
else{
    res.json({message: 'fig-vam!'}); 
}
}) 
.put( async (req, res) => {
    const { user } = req.session;
    const { name, info, image, price, have } = req.body;
    const { id } = req.params;
if(!name || !info || !image || !price || !have){res.json({message: 'заполните все поля!'}); return;};
    if(user){
    try {
        const product = await Product.findOne({where: {id},
             include: [
                 {model: User},
                 {model: Comment},
                 {model: Like}
                ]
            });
        if(product.user_id === user.id){
         product.name = name;
         product.info = info;
         product.image = image;
         product.price = price;
         product.have = have;
        await product.save();
       const html = createHtml(MyProductItem, {product});
         res.json({message: 'ok', html});
        }
        else{
       res.json({message: 'fig-vam!'});
        }
    } catch (err) {
       res.json({message: err.message}); 
    }
}
else{
       res.json({message: 'fig-vam!'});
}
})

router.route('/product/formUpdate/:id')
.get( async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findOne({where: {id}, raw: true});
        const html = createHtml(FormUpdateProduct, {product});
        res.json({message: html});
    } catch (err) {
        res.status(500).json({message: err.message});
    }


})

router.route('/product/add/form')
.get((req, res) => {
   const html = createHtml(FormAddProduct);
   res.json({html});
})

module.exports = router;