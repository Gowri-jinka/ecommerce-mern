import mongoose from "mongoose";
import dotenv from "dotenv";  //loads .env variables
import Product from "./models/Product.js";

dotenv.config();  //loads the all the variable in the .env file

const seedData = async () => {
  try {
    // connect to DB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected for Seeding");

    // clear existing data 
    await Product.deleteMany();    //avoids duplicates
    console.log("Old Products Removed");

    // products
    const products = [
      // MEN
      { name: "Men T-Shirt", category: "men", price: 499, description: "Comfort cotton T-shirt",image: "https://th.bing.com/th/id/OIP.SAEHv-JSa7p8FJHvMCyBTQHaHa?w=190&h=190&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"},
      { name: "Men Jeans", category: "men", price: 999, description: "Blue denim jeans" , image: "https://th.bing.com/th/id/OIP.xHRAwQm1hgt9-agv5q9XaQHaJQ?w=186&h=233&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"},
      { name: "Men Jacket", category: "men", price: 1499, description: "Winter jacket", image: "https://th.bing.com/th/id/OIP.l1do9qS16sn8NSESjstmLwHaHa?w=118&h=150&c=6&o=7&dpr=1.3&pid=1.7&rm=3"},
      { name: "Men Shirt", category: "men", price: 699, description: "Formal shirt", image: "https://images.meesho.com/images/products/401395624/sdzw5_400.webp" },
      { name: "Men Shoes", category: "men", price: 1299, description: "Running shoes", image: "https://th.bing.com/th/id/OIP.NZmMIbhLsOb4lAAR6hGH6wHaHa?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3" },

      // WOMEN
      { name: "Women Dress", category: "women", price: 799, description: "Stylish dress", image: "https://i.pinimg.com/736x/11/02/66/1102663b3414937caccb5d5c8e4292e5.jpg" },
      { name: "Women Top", category: "women", price: 399, description: "Casual top", image: "https://i.pinimg.com/736x/39/50/a9/3950a94226c4323939a79cfa6f8722cd.jpg" },
      { name: "Women Saree", category: "women", price: 1299, description: "Traditional saree", image: "https://i.pinimg.com/originals/de/9a/b1/de9ab147f07d77bc11882d6e03c0d977.jpg" },
      { name: "Women Handbag", category: "women", price: 999, description: "Fashion handbag", image: "https://i.pinimg.com/236x/26/48/13/264813ccfb726511aa475ce663e9a2a8.jpg" },
      { name: "Women Sandals", category: "women", price: 699, description: "Comfort sandals", image: "https://i.ytimg.com/vi/BW51z6SWjVo/oardefault.jpg?sqp=-oaymwEkCJUDENAFSFqQAgHyq4qpAxMIARUAAAAAJQAAyEI9AICiQ3gB&rs=AOn4CLBFNBabLsFeudALhjIsmsEhHfHZjQ"},

      // KIDS
      { name: "Kids Shirt", category: "kids", price: 299, description: "Kids shirt", image: "https://tse3.mm.bing.net/th/id/OIP.AtZJSDBZJ9K-H6jeR7Ia8QAAAA?rs=1&pid=ImgDetMain&o=7&rm=3" },
      { name: "Kids Shorts", category: "kids", price: 199, description: "Kids shorts", image: "https://th.bing.com/th/id/OIP.rz2fsS0zR_hqRKwcQyHmaAHaJ4?w=162&h=216&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
      { name: "Kids Jacket", category: "kids", price: 599, description: "Kids winter jacket",image: "https://tse1.mm.bing.net/th/id/OIP.GdaVDgCyCowTXrxloEOfFgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" },
      { name: "Kids Toy Set", category: "kids", price: 499, description: "Fun toy set",image: "https://tse1.mm.bing.net/th/id/OIP.lCpV3-GWuqGwbWBk2G837gHaGw?rs=1&pid=ImgDetMain&o=7&rm=3" },
      { name: "Kids Shoes", category: "kids", price: 399, description: "Kids sneakers",image: "https://th.bing.com/th/id/OIP.ootumqy1780BVAaF3TAEogHaHa?w=114&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" }
    ];

    // insert
    await Product.insertMany(products);

    console.log("Products Inserted Successfully ");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedData();    //execute all the seeding data