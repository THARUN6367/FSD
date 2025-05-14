const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');

// Load environment variables
dotenv.config();

// Sample product data
const sampleProducts = [
  {
    name: 'Wireless Headphones',
    description: 'High-quality noise-cancelling headphones with 20-hour battery life',
    price: 149,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    category: 'Electronics',
    countInStock: 15
  },
  {
    name: 'Smartphone',
    description: 'Latest smartphone with advanced camera and fast processor',
    price: 799,
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
    category: 'Electronics',
    countInStock: 10
  },
  {
    name: 'Running Shoes',
    description: 'Comfortable running shoes with excellent support',
    price: 89,
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    category: 'Clothing',
    countInStock: 25
  },
  {
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer and multiple brew settings',
    price: 69,
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    category: 'Home',
    countInStock: 8
  },
  {
    name: 'Leather Wallet',
    description: 'Premium leather wallet with multiple card slots',
    price: 39,
    imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
    category: 'Accessories',
    countInStock: 30
  },
  {
    name: 'Backpack',
    description: 'Durable backpack with laptop compartment and water bottle pockets',
    price: 59,
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    category: 'Accessories',
    countInStock: 12
  }
];

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB for seeding');
    seedData();
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Seed the database
const seedData = async () => {
  try {
    // Clear existing data
    await Product.deleteMany({});
    console.log('Products cleared');

    // Insert new products
    const createdProducts = await Product.insertMany(sampleProducts);
    console.log(`${createdProducts.length} products inserted`);

    console.log('Data seeded successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error seeding data: ${error.message}`);
    process.exit(1);
  }
}; 