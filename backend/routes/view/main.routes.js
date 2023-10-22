const Layout = require('../../views/Layout');
const Main = require('../../views/Main');

const router = require('express').Router();



router.route('/')
.get((req, res) => {
    //const d = new Date().toLocaleString()
 res.renderComponent(Main, {title: 'pixel mania system'})
});

module.exports = router;