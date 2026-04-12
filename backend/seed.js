import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected for Seeding");

    await Product.deleteMany();
    console.log("Old Products Removed");

    const products = [

      //  MEN
      { name: "Men T-Shirt", category: "men", price: 499, description: "Cotton T-shirt", image: "https://th.bing.com/th/id/OIP.SAEHv-JSa7p8FJHvMCyBTQHaHa?w=190&h=190&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
      { name: "Men Jeans", category: "men", price: 999, description: "Denim jeans", image: "https://th.bing.com/th/id/OIP.xHRAwQm1hgt9-agv5q9XaQHaJQ?w=186&h=233&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
      { name: "Men Jacket", category: "men", price: 1499, description: "Winter jacket", image: "https://th.bing.com/th/id/OIP.l1do9qS16sn8NSESjstmLwHaHa?w=118&h=150&c=6&o=7&dpr=1.3&pid=1.7&rm=3" },
      { name: "Men Shirt", category: "men", price: 699, description: "Formal shirt", image: "https://images.meesho.com/images/products/401395624/sdzw5_400.webp" },
      { name: "Men Shoes", category: "men", price: 1299, description: "Running shoes", image: "https://th.bing.com/th/id/OIP.NZmMIbhLsOb4lAAR6hGH6wHaHa?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3" },

      //  WOMEN
      { name: "Women Dress", category: "women", price: 799, description: "Stylish dress", image: "https://i.pinimg.com/736x/11/02/66/1102663b3414937caccb5d5c8e4292e5.jpg" },
      { name: "Women Top", category: "women", price: 399, description: "Casual top", image: "https://i.pinimg.com/736x/39/50/a9/3950a94226c4323939a79cfa6f8722cd.jpg" },
      { name: "Women Saree", category: "women", price: 1299, description: "Traditional saree", image: "https://i.pinimg.com/originals/de/9a/b1/de9ab147f07d77bc11882d6e03c0d977.jpg" },
      { name: "Women Handbag", category: "women", price: 999, description: "Handbag", image: "https://i.pinimg.com/236x/26/48/13/264813ccfb726511aa475ce663e9a2a8.jpg" },
      { name: "Women Sandals", category: "women", price: 699, description: "Sandals", image: "https://i.ytimg.com/vi/BW51z6SWjVo/oardefault.jpg?sqp=-oaymwEkCJUDENAFSFqQAgHyq4qpAxMIARUAAAAAJQAAyEI9AICiQ3gB&rs=AOn4CLBFNBabLsFeudALhjIsmsEhHfHZjQ" },

      //  KIDS
      { name: "Kids Shirt", category: "kids", price: 299, description: "Kids shirt", image: "https://tse3.mm.bing.net/th/id/OIP.AtZJSDBZJ9K-H6jeR7Ia8QAAAA?rs=1&pid=ImgDetMain&o=7&rm=3" },
      { name: "Kids Shorts", category: "kids", price: 199, description: "Kids shorts", image: "https://th.bing.com/th/id/OIP.rz2fsS0zR_hqRKwcQyHmaAHaJ4?w=162&h=216&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
      { name: "Kids Jacket", category: "kids", price: 599, description: "Kids jacket", image: "https://tse1.mm.bing.net/th/id/OIP.GdaVDgCyCowTXrxloEOfFgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" },
      { name: "Kids Toy Set", category: "kids", price: 499, description: "Toy set", image: "https://tse1.mm.bing.net/th/id/OIP.lCpV3-GWuqGwbWBk2G837gHaGw?rs=1&pid=ImgDetMain&o=7&rm=3" },
      { name: "Kids Shoes", category: "kids", price: 399, description: "Kids shoes", image: "https://th.bing.com/th/id/OIP.ootumqy1780BVAaF3TAEogHaHa?w=114&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },

      //  ELECTRONICS
      { name: "iPhone 13", category: "mobiles", price: 60000, image: "https://th.bing.com/th/id/OIP.9GDEqLWKTBmKzIMEkjBcKAHaL5?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3" },
      { name: "Samsung Galaxy", category: "mobiles", price: 50000, image: "https://tse3.mm.bing.net/th/id/OIP.OhPFuIQGilfslklLNGs3xwHaHc?rs=1&pid=ImgDetMain&o=7&rm=3" },
      { name: "OnePlus Phone", category: "mobiles", price: 30000, image: "https://m.media-amazon.com/images/I/4168qDW4XnL._SL500_.jpg" },
      { name: "iPhone 13 Pro", category: "mobiles", price: 65000, image: "https://th.bing.com/th/id/OIP.vuI2SyHc_A8d0WLAuzHmxgHaHa?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3" },
      { name: "Samsung Galaxy S22", category: "mobiles", price: 55000, image: "https://th.bing.com/th/id/OIP.FRRq0smEoP_ebxIaD08xlgHaHa?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3" },
      { name: "OnePlus 11R", category: "mobiles", price: 40000, image: "https://tse4.mm.bing.net/th/id/OIP.1nEwpUPpPPaEgAFAYHIBGgAAAA?w=333&h=445&rs=1&pid=ImgDetMain&o=7&rm=3" },
      { name: "Redmi Note 12 Pro", category: "mobiles", price: 25000, image: "https://th.bing.com/th/id/OIP.tRcvdw8ZvY61IBen4yResgHaHZ?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3" },
      { name: "Realme Narzo 60", category: "mobiles", price: 18000, image: "https://tse4.mm.bing.net/th/id/OIP.HrcEI3nDcH0VuKf_1ueUEAHaH4?rs=1&pid=ImgDetMain&o=7&rm=3" },
      { name: "Vivo V29", category: "mobiles", price: 30000, image: "https://tse3.mm.bing.net/th/id/OIP.822IUy7kjedxgXYqdbK2-AHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" },
      { name: "Oppo F21 Pro", category: "mobiles", price: 28000, image: "https://tse4.mm.bing.net/th/id/OIP.2No8haluc_zNtYDgTu1pCgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" },
      { name: "Google Pixel 7", category: "mobiles", price: 60000, image: "https://th.bing.com/th/id/OIP.2abtev6oxmnYLKbPq6AIAQHaEK?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3" },
      { name: "iQOO Neo 7", category: "mobiles", price: 35000, image: "https://cdn.kalvo.com/uploads/img/gallery/47725-vivo-iqoo-neo-7-5.jpg" },
      { name: "Motorola Edge 40", category: "mobiles", price: 30000, image: "https://tse3.mm.bing.net/th/id/OIP.uNZTZ4bCBSPEVe4AZ5Fr0gHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" },



      { name: "HP Laptop", category: "laptops", price: 50000, image: "https://i5.walmartimages.com/seo/HP-Pavilion-13-3-FHD-Intel-Core-i3-8GB-RAM-128GB-SSD-Silver_906cf222-d138-430a-8146-d129b0cca3a2_2.f838f300a6e31f50074faf4091a1da7b.jpeg" },
      { name: "Dell Laptop", category: "laptops", price: 55000, image: "https://tse3.mm.bing.net/th/id/OIP.ck-BcI0P93vd_KWEThBX8gHaE2?rs=1&pid=ImgDetMain&o=7&rm=3" },
      { name: "HP Pavilion 15", category: "laptops", price: 55000, image: "https://tse3.mm.bing.net/th/id/OIP.YdFkbpLodqCiWJZtSjtffwHaEK?rs=1&pid=ImgDetMain&o=7&rm=3" },
      { name: "Dell Inspiron 14", category: "laptops", price: 52000, image: "https://tse1.mm.bing.net/th/id/OIP.3GDsP_iPt2Gvua7p9PxaEwHaEc?rs=1&pid=ImgDetMain&o=7&rm=3" },
      { name: "Lenovo IdeaPad Slim 5", category: "laptops", price: 50000, image: "https://tse1.mm.bing.net/th/id/OIP.UEROs0UnAM08p3rE6DqWCwHaGI?rs=1&pid=ImgDetMain&o=7&rm=3" },
      { name: "MacBook Air M1", category: "laptops", price: 90000, image: "https://tse3.mm.bing.net/th/id/OIP.LXmbtfryRNjjy7LDUBhX5AHaE7?rs=1&pid=ImgDetMain&o=7&rm=3" },
      { name: "Asus VivoBook 15", category: "laptops", price: 48000, image: "https://th.bing.com/th/id/OIP.jN3S1Sc8y6gzPahO83ovMQHaE-?w=255&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
      { name: "Acer Aspire 7", category: "laptops", price: 60000, image: "https://th.bing.com/th/id/OIP.5PQzJmuDO0MLD9n8pjy-aQHaEy?w=270&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
      { name: "MSI Gaming Laptop", category: "laptops", price: 75000, image: "https://tse2.mm.bing.net/th/id/OIP.h29GW8pX32ONehf6dW6EwQHaEK?rs=1&pid=ImgDetMain&o=7&rm=3" },
      { name: "Lenovo ThinkPad E14", category: "laptops", price: 65000, image: "https://tse1.explicit.bing.net/th/id/OIP.0lGVmqdLkojE4iXsV6f7zAHaGP?rs=1&pid=ImgDetMain&o=7&rm=3" },
      { name: "HP Victus Gaming", category: "laptops", price: 70000, image: "https://tse1.mm.bing.net/th/id/OIP.eOoKnhDDjByETfOMH4dqAwHaFF?rs=1&pid=ImgDetMain&o=7&rm=3" },
      { name: "Asus ROG Strix", category: "laptops", price: 95000, image: "https://th.bing.com/th/id/OIP.OgnggewQqw496_NGRipLHAHaFH?w=250&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },


      { name: "Boat Headphones", category: "headphones", price: 2000, image: "https://m.media-amazon.com/images/I/61stQYWQO4L.jpg" },
      { name: "Sony Headphones", category: "headphones", price: 5000, image: "https://m.media-amazon.com/images/I/510cs9VwjUL._AC_.jpg" },
      { name: "Boat Rockerz 450", category: "headphones", price: 2000, image: "https://th.bing.com/th/id/OIP.QcFORGa59qrEXm147Q3jowHaHa?w=166&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
      { name: "Sony WH-1000XM4", category: "headphones", price: 15000, image: "https://th.bing.com/th/id/OIP.o9OPFBeUxw2tVJAo7BNiVgHaHa?w=189&h=189&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
  

      { name: "Noise Smartwatch", category: "smartwatches", price: 3000, image: "https://th.bing.com/th/id/OIP.UXl2pKogjBpsC7zRW2KwMgHaHa?w=180&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
      { name: "Noise ColorFit Pro 4", category: "smartwatches", price: 3000, image: "https://th.bing.com/th/id/OIP.eFEjiObZiCy4HackYSXzEgHaHa?w=187&h=187&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
      { name: "Fire-Boltt Ninja", category: "smartwatches", price: 2500, image: "https://th.bing.com/th/id/OIP.kmw0ONWU7beU6NsuNSQnAAHaFj?w=229&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
  

      //  HOME
      { name: "Wooden Chair", category: "furniture", price: 3000, image: "https://tse1.mm.bing.net/th/id/OIP.U_-pLmfbP2hnpqiZuVIVYwHaLc?rs=1&pid=ImgDetMain&o=7&rm=3" },
      { name: "Dining Table", category: "furniture", price: 8000, image: "https://m.media-amazon.com/images/I/71fFEp2ObBL._SL1100_.jpg" },
      { name: "Sofa Set 3-Seater", category: "furniture", price: 15000, image: "https://th.bing.com/th/id/OIP.nH8YaaK5XotqfuQXYV2vKAHaHa?w=218&h=218&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
      { name: "Study Table", category: "furniture", price: 4000, image: "https://th.bing.com/th/id/OIP.TUgwywMzGxTXn2Rpcx_GwgHaIq?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3" },
  

      { name: "Wall Decor", category: "home-decor", price: 1200, image: "https://tse3.mm.bing.net/th/id/OIP.gyDwQYc5HLIYbV2-xpZ0DAHaHP?rs=1&pid=ImgDetMain&o=7&rm=3" },
      { name: "Lamp", category: "lighting", price: 1500, image: "https://tse1.mm.bing.net/th/id/OIP.-U4Dfe1TbqtuQpVgxBQmYAHaEJ?rs=1&pid=ImgDetMain&o=7&rm=3" },
      { name: "Wall Art Frame", category: "home-decor", price: 1200, image: "https://th.bing.com/th/id/OIP.ClmObYfGI8wgkV93l1IuWwHaHa?w=199&h=199&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
      { name: "Decorative Mirror", category: "home-decor", price: 2000, image: "https://th.bing.com/th/id/OIP.RWysQc9YzfsYkyyZLD4ywAHaGa?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3" },
    
    


      { name: "Mixer Grinder", category: "kitchen", price: 2500, image: "https://tse3.mm.bing.net/th/id/OIP.b4Rn3CkiSBMWa3hTWGzNGgHaHh?rs=1&pid=ImgDetMain&o=7&rm=3" },
      { name: "Non-Stick Cookware Set", category: "kitchen", price: 3000, image: "https://i5.walmartimages.com/seo/Granitestone-20-Pc-Ceramic-Cookware-Set-Nonstick-Pots-Pans-Set-Non-Stick-Kitchen-Bakeware-Utensils-Pots-Pans-Cooking-Non-Toxic-Cookware-Sets-Oven-Dis_868fb395-830e-4dd8-9fe6-5c0ce68727e2.36f73a2dfbad3f85aca487b85d5f5416.jpeg" },
      { name: "Pressure Cooker", category: "kitchen", price: 2000, image: "https://th.bing.com/th/id/OIP.e_s5yeXQ9q2e7PG9GfE5twHaE8?w=285&h=190&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
      { name: "Electric Kettle", category: "kitchen", price: 1500, image: "https://tse1.mm.bing.net/th/id/OIP.Ku2dfRQF7h4w77IfjubsKQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" },
    
      
      //Lightening
      { name: "LED Ceiling Light", category: "lighting", price: 1500, image: "https://th.bing.com/th/id/OIP.zDpOJ79DFbfFkax56jCM1AHaHa?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3" },
      { name: "Table Lamp", category: "lighting", price: 1000, image: "https://th.bing.com/th/id/OIP.0ax3BBqTLsRlKL1PTUgSzgHaHa?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3" },
      { name: "Floor Lamp", category: "lighting", price: 2500, image: "https://tse2.mm.bing.net/th/id/OIP.cMc76KfqFaofRR7bSFvJzgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" },
      
    
      //  BEAUTY
      { name: "Face Cream", category: "skincare", price: 500, image: "https://tse3.mm.bing.net/th/id/OIP.7u3JK8tqv35HlIDEWic2ugHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" },
      { name: "Lipstick", category: "makeup", price: 800, image: "https://tse2.mm.bing.net/th/id/OIP.2hJPp6xDlPGw7P56I68qNgHaKb?rs=1&pid=ImgDetMain&o=7&rm=3" },
      { name: "Shampoo", category: "haircare", price: 400, image: "https://tse1.mm.bing.net/th/id/OIP.0p0ZiiymXnPxXN6L-4R5jgHaJ2?rs=1&pid=ImgDetMain&o=7&rm=3" }, 

      // Skincare
      { name: "Face Wash Gel", category: "skincare", price: 300, image: "https://tse3.mm.bing.net/th/id/OIP.AqDXnK7vQZZ82bH9OrlbzQHaIp?rs=1&pid=ImgDetMain&o=7&rm=3" },
      { name: "Vitamin C Serum", category: "skincare", price: 600, image: "https://th.bing.com/th/id/OIP.RFhBJofnPI4Au8nntg4PNAHaHa?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3" },
      { name: "Moisturizing Cream", category: "skincare", price: 500, image: "https://i5.walmartimages.com/asr/5d807a27-78c7-4afd-9d6f-bbd51af9cbae.e1c6621ac86eb5a50eb2ed0054ec8789.jpeg" },
      { name: "Sunscreen SPF 50", category: "skincare", price: 400, image: "https://i.pinimg.com/originals/0e/cc/21/0ecc219a8bbec19378755a6837f6378e.jpg" },
      { name: "Night Repair Cream", category: "skincare", price: 700, image: "https://tse2.mm.bing.net/th/id/OIP.RnPogIfsXrmfKZCGzghc4AHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" },
 

      // MAKEUP 
      { name: "Mascara Waterproof", category: "makeup", price: 700, image: "https://tse2.mm.bing.net/th/id/OIP.N18owEmesZ8r_wlj8qCXJgHaFf?rs=1&pid=ImgDetMain&o=7&rm=3" },
      { name: "Makeup Kit Set", category: "makeup", price: 1500, image: "https://tse4.mm.bing.net/th/id/OIP.plvRW3hpX_nUdaeuL9QPOgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" },
      { name: "Blush Palette", category: "makeup", price: 650, image: "https://th.bing.com/th/id/OIP.C6Qm9yq7mvRCixWUXPojawHaHa?w=174&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
      { name: "Highlighter Stick", category: "makeup", price: 550, image: "https://tse3.mm.bing.net/th/id/OIP.ZbzY4JGphi3gJIs58h_1_wHaIb?rs=1&pid=ImgDetMain&o=7&rm=3" },
      { name: "Lip Gloss", category: "makeup", price: 350, image: "https://tse1.mm.bing.net/th/id/OIP.KzAvfvnDhvOZfbUo5KN9_gAAAA?rs=1&pid=ImgDetMain&o=7&rm=3" },
      { name: "Eye Shadow Palette", category: "makeup", price: 1200, image: "https://tse3.mm.bing.net/th/id/OIP.2ANbPS_3FHF8W-lfJRfVGwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" },

      //  HAIRCARE (10)
      { name: "Hair Oil Coconut", category: "haircare", price: 300, image: "https://tse1.mm.bing.net/th/id/OIP.wGmLTBRuXXtm2Db1eQeVhgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" },
      { name: "Anti-Dandruff Shampoo", category: "haircare", price: 400, image: "https://i5.walmartimages.com/asr/718e192b-0d75-4d44-9418-2f59ee00eb65.53d90e0d1b0cb46135a232772890cd81.jpeg" },
      { name: "Hair Conditioner", category: "haircare", price: 350, image: "https://tavish.in/cdn/shop/files/HairConditioner.webp?v=1740645364&width=2000" },
      { name: "Hair Serum", category: "haircare", price: 500, image: "https://m.media-amazon.com/images/I/81FR+5BHueL._SL1500_.jpg" },
      { name: "Hair Mask", category: "haircare", price: 600, image: "https://th.bing.com/th/id/OIP.Dzxt8WGfWG_9x6cfVd0WoAHaHa?w=189&h=189&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
      { name: "Hair Straightener", category: "haircare", price: 1500, image: "https://th.bing.com/th/id/OIP.NZ6b0FuOZXnpYbLGoi_togHaE8?w=286&h=191&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
      { name: "Hair Dryer", category: "haircare", price: 1200, image: "https://th.bing.com/th/id/OIP.GRYpFIAFOm1Hw3PVGI_bXAHaHp?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3" },
      { name: "Hair Curling Iron", category: "haircare", price: 1300, image: "https://th.bing.com/th/id/OIP.joCp7L9NiRYuK85_DzUNDQHaHa?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3" },
      { name: "Herbal Shampoo", category: "haircare", price: 350, image: "https://th.bing.com/th/id/OIP.FdZCnBRTq8F93ta2qDkTPgHaHa?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3" },
      { name: "Hair Growth Oil", category: "haircare", price: 450, image: "https://tse3.mm.bing.net/th/id/OIP.Qb-MHbdwl5MH9TjyjDasIgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" }
    ];
    await Product.insertMany(products);
    console.log(" Products Inserted Successfully");
    process.exit();

  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
seedData();