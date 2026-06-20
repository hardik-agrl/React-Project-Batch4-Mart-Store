const Product = require('../models/Product');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

exports.addProduct = async (req, res) => {
    try {
        let imageUrl = req.body.image || '';

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'product_images'
            });
            imageUrl = result.secure_url;
        }

        const product = await Product.create({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: imageUrl
        });

        res.status(201).json({
            message: 'Product added successfully',
            product
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();

        res.status(200).json({
            message: 'All Products',
            products
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

exports.getOneProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        res.status(200).json({
            message: 'Product details',
            product
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        res.status(200).json({
            message: 'Product updated successfully',
            product
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        res.status(200).json({
            message: 'Product deleted successfully'
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

exports.seedProducts = async (req, res) => {
    try {
        const count = await Product.countDocuments();

        if (count > 0) {
            return res.status(200).json({
                message: 'Products already exist',
                count
            });
        }

        const sampleProducts = [
            {
                title: 'Wireless Headphones',
                description: 'Premium noise-cancelling headphones with 30-hour battery life.',
                price: 79.99,
                category: 'electronics',
                image: 'https://fakestoreapi.com/img/61sbMiUNoEL._AC_UL640_QL65_ML3_.jpg'
            },
            {
                title: 'Classic Cotton T-Shirt',
                description: 'Soft breathable cotton tee available in multiple colors.',
                price: 19.99,
                category: 'clothing',
                image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg'
            },
            {
                title: 'Stainless Steel Water Bottle',
                description: 'Insulated bottle that keeps drinks cold for 24 hours.',
                price: 24.5,
                category: 'accessories',
                image: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg'
            },
            {
                title: 'Running Shoes',
                description: 'Lightweight running shoes with cushioned sole for daily workouts.',
                price: 64.99,
                category: 'footwear',
                image: 'https://fakestoreapi.com/img/61o9Q9QGCbL._AC_UL640_QL65_ML3_.jpg'
            }
        ];

        const products = await Product.insertMany(sampleProducts);

        res.status(201).json({
            message: 'Sample products seeded successfully',
            products
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};
