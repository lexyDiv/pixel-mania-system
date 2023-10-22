const router = require('express').Router();
const bcrypt = require('bcrypt');
const {User} = require('../../db/models');

router.route('/log')
.post((req, res) => {
   let conditate;
   const {password, email} = req.body;
   User.findOne({where: {email}})
   .then(user => {
    conditate = user;
return bcrypt.compare(password, user.password)
   })
   .then((val) => {
    if(val){
        req.session.user = {name: conditate.name, id: conditate.id, status: conditate.status};
    };
     res.json({message: val});
   })
   .catch(err => {
    res.json({message: err.message});
   })
})

router.route('/reg')
.post( async (req, res) => {
    try{
   const {name, password, email, status} = req.body;
   if(!name){
    res.json({message: 'name'});
   }
   else if(!email){
    res.json({message: 'email'});
   }
   else if(!password || password.length < 3){
    res.json({message: 'password'});
   }
   else {
     const user = await User.findOne({where: {email}});
     if(user) {
        res.json({message: 'in'});
     }
     else {
        
    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({name, password: hash, email, status});
        req.session.user = {name: newUser.name, id: newUser.id, status: newUser.status};
        res.json({message: 'ok', newUser});
        }
     }
   }catch({message}){
    res.status(500).json({message});
}
})


module.exports = router;