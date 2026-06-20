const express = require('express');
const cors = require('cors');
const app = express();

const connectDB = require('./config/db');
const ProductRoute = require('./routes/ProductRoutes');
const authRoutes = require('./routes/AuthRoutes');

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
    res.send('Ecommerce API is running on port 1234');
});

app.use('/api/v1', ProductRoute);
app.use('/auth', authRoutes);

connectDB();

app.listen(1234, () => {
    console.log('Server started on port 1234');
});
