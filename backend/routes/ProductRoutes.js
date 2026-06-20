const express = require('express');
const router = express.Router();
const multer = require('multer');

const {
    addProduct,
    getAllProducts,
    getOneProduct,
    updateProduct,
    deleteProduct,
    seedProducts
} = require('../controller/ProductController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

router.post('/new/product', upload.single('image'), addProduct);
router.get('/all/products', getAllProducts);
router.get('/one/product/:id', getOneProduct);
router.put('/update/product/:id', updateProduct);
router.delete('/delete/product/:id', deleteProduct);
router.post('/seed/products', seedProducts);

module.exports = router;
