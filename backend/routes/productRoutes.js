
const express = require('express');
const router = express.Router();
const { getPaginatedProducts } = require('../controllers/productController')



router.route('/').get(async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const paginatedProducts = await getPaginatedProducts(page, limit);

    res.json(paginatedProducts);
  } catch (error) {
    console.error('Error retrieving paginated products:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



module.exports = router;




