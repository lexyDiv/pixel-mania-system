const router = require('express').Router();
const ProductAbout = require('../../components/products/ProductAbout');
const Products = require('../../components/products/Products');
const MyProducts = require('../../components/products/MyProducts');
const CommentAddBtn = require('../../components/comments/CommentAddBtn');
const CommentItem = require('../../components/comments/CommentItem');
const CommentItemDelMee = require('../../components/comments/CommentItemDelMee');
const FormAddComment = require('../../components/comments/formAddComment');
const FormUpdateComment = require('../../components/comments/FormUpdataComment');
const Favorites = require('../../components/favorites/Favorites');
const { Product } = require('../../db/models');
const { User } = require('../../db/models');
const { Favorite } = require('../../db/models');
const { Comment } = require('../../db/models');
const createHtml = require('../../middleware/createHtml');


router.route('/:id')
.delete(async (req, res) => {
    const { user } = req.session;
        try {
            const { id } = req.params;
            const favorite = await Favorite.findOne({where: {id}});
            if(user && user.id === favorite.user_id){
              const product = await Product.findOne({where: {id: favorite.product_id}});
              product.have += 1;
              await product.save();
              const del = await favorite.destroy();
              del ? res.json({message: 'ok'}) : res.json({message: 'false'});
            }
            else{
                res.json({message: 'fig-vam!'});
            }
        } catch (err) {
           res.json({message: err.message}); 
        }

    })





router.route('/')
.post(async (req, res) => {
    const { id } = req.body;
    const { user } = req.session;
    if(user){
  try {
   const favotite = await Favorite.create({product_id: id, user_id: user.id});
   const product = await Product.findOne({where: {id}});
      product.have -=1;
      await product.save();
    res.json({message: 'ok', favotite});
  } catch (err) {
    res.json({message: err.message});
  }
}
else{
    res.json({message: 'fig-vam!'});
}
})

module.exports = router;