import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import connectDB from "../config/mongodb.js";
import productModel from "../models/productModel.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Sample image URLs for demonstration (replace with actual URLs if needed)
const sampleImageUrls = [
  "https://res.cloudinary.com/demo/image/upload/v1/sample_phone1.jpg",
  "https://res.cloudinary.com/demo/image/upload/v1/sample_phone2.jpg",
  "https://res.cloudinary.com/demo/image/upload/v1/sample_phone3.jpg",
  "https://res.cloudinary.com/demo/image/upload/v1/sample_phone4.jpg",
];

// Main function to import products
async function importProducts() {
  try {
    // Define the products data manually based on assets.js
    const products = [
      {
        name: "Samsung Galaxy S24 Ultra",
        description:
          "The Samsung Galaxy S24 Ultra is a flagship smartphone that boasts a stunning 6.8-inch Dynamic AMOLED display, powered by the latest Snapdragon processor for lightning-fast performance. With its versatile camera system, including a 200MP main sensor, and S Pen support, it's perfect for photography enthusiasts and productivity on the go.",
        price: 100000,
        RAM: ["8GB", "12GB"],
        brand: "Samsung",
        bestseller: true,
        image: [sampleImageUrls[0]],
        date: new Date().getTime(),
      },
      {
        name: "Apple iPhone 15 Pro Max",
        description:
          "The iPhone 15 Pro Max is a premium smartphone from Apple, featuring a stunning 6.7-inch Super Retina XDR display, A17 Pro chip for lightning-fast performance, and an advanced camera system with ProRAW and ProRes capabilities. With its sleek design, durable materials, and iOS ecosystem, it's the ultimate device for photography enthusiasts and power users.",
        price: 150000,
        RAM: ["8GB", "12GB"],
        brand: "Apple",
        bestseller: true,
        image: [
          sampleImageUrls[0],
          sampleImageUrls[1],
          sampleImageUrls[2],
          sampleImageUrls[3],
        ],
        date: new Date().getTime(),
      },
      {
        name: "OnePlus 12R",
        description:
          "The OnePlus 12R is a flagship smartphone that combines cutting-edge technology with a sleek design. It features a stunning 6.7-inch AMOLED display, powered by the latest Snapdragon processor for lightning-fast performance. With its versatile camera system, long-lasting battery, and OxygenOS for a smooth user experience, the OnePlus 12R is perfect for tech enthusiasts and everyday users alike.",
        price: 50000,
        RAM: ["8GB", "12GB", "16GB"],
        brand: "Oneplus",
        bestseller: true,
        image: [sampleImageUrls[0]],
        date: new Date().getTime(),
      },
      {
        name: "Realme GT 6",
        description:
          "The Realme GT 6 is a powerful smartphone that offers an immersive 6.7-inch AMOLED display, Snapdragon processor for lightning-fast performance, and a versatile camera system for stunning photography. With its sleek design, long-lasting battery, and Realme UI for a smooth user experience, the GT 6 is perfect for gamers and multimedia enthusiasts.",
        price: 100000,
        RAM: ["8GB", "12GB"],
        brand: "Realme",
        bestseller: true,
        image: [sampleImageUrls[0]],
        date: new Date().getTime(),
      },
      {
        name: "Google Pixel 8 Pro",
        description:
          "The Google Pixel 8 Pro is a flagship smartphone that features a stunning 6.7-inch OLED display, powered by the latest Google Tensor processor for exceptional performance. With its advanced camera system, including AI-enhanced photography capabilities, and stock Android experience, the Pixel 8 Pro is perfect for photography enthusiasts and those who value a clean user interface.",
        price: 100000,
        RAM: ["8GB", "12GB"],
        brand: "Google",
        bestseller: true,
        image: [sampleImageUrls[0]],
        date: new Date().getTime(),
      },
      {
        name: "Xiaomi 14 Ultra",
        description:
          "The Xiaomi 14 Ultra is a premium smartphone that boasts a stunning 6.73-inch AMOLED display, powered by the latest Snapdragon processor for lightning-fast performance. With its versatile camera system, including a 200MP main sensor, and MIUI for a smooth user experience, the Xiaomi 14 Ultra is perfect for photography enthusiasts and power users.",
        price: 100000,
        RAM: ["8GB", "16GB"],
        brand: "Xiaomi",
        bestseller: true,
        image: [sampleImageUrls[0]],
        date: new Date().getTime(),
      },
      {
        name: "Motorola Edge 50 Pro",
        description:
          "The Motorola Edge 50 Pro is a flagship smartphone that features a stunning 6.7-inch OLED display, powered by the latest Snapdragon processor for exceptional performance. With its advanced camera system, including AI-enhanced photography capabilities, and near-stock Android experience, the Edge 50 Pro is perfect for photography enthusiasts and those who value a clean user interface.",
        price: 50000,
        RAM: ["8GB", "12GB"],
        brand: "Motorola",
        bestseller: false,
        image: [sampleImageUrls[0]],
        date: new Date().getTime(),
      },
      {
        name: "Nothing Phone (2)",
        description:
          "The Nothing Phone (2) is a unique smartphone that features a transparent design and a 6.7-inch OLED display. Powered by the latest Snapdragon processor, it offers exceptional performance and a clean user interface. With its innovative design and focus on user experience, the Nothing Phone (2) is perfect for those who want something different.",
        price: 50000,
        RAM: ["8GB", "16GB"],
        brand: "Nothing",
        bestseller: false,
        image: [sampleImageUrls[0]],
        date: new Date().getTime(),
      },
      {
        name: "iQOO Neo 9 Pro",
        description:
          "The iQOO Neo 9 Pro is a powerful smartphone that offers an immersive 6.78-inch AMOLED display, Snapdragon processor for lightning-fast performance, and a versatile camera system for stunning photography. With its sleek design, long-lasting battery, and iQOO UI for a smooth user experience, the Neo 9 Pro is perfect for gamers and multimedia enthusiasts.",
        price: 50000,
        RAM: ["8GB", "12GB"],
        brand: "Iqoo",
        bestseller: false,
        image: [sampleImageUrls[0]],
        date: new Date().getTime(),
      },
      {
        name: "Vivo X100 Pro",
        description:
          "The Vivo X100 Pro is a flagship smartphone that features a stunning 6.78-inch AMOLED display, powered by the latest Snapdragon processor for exceptional performance. With its advanced camera system, including AI-enhanced photography capabilities, and Funtouch OS for a smooth user experience, the X100 Pro is perfect for photography enthusiasts and those who value a clean user interface.",
        price: 50000,
        RAM: ["8GB", "12GB"],
        brand: "Vivo",
        bestseller: false,
        image: [sampleImageUrls[0]],
        date: new Date().getTime(),
      },
    ];

    console.log(`Preparing to import ${products.length} products`);

    // Process each product
    for (const product of products) {
      // Check if product already exists in the database
      const existingProduct = await productModel.findOne({
        name: product.name,
      });

      if (existingProduct) {
        console.log(`Product "${product.name}" already exists, skipping...`);
        continue;
      }

      // Save product to database
      const newProduct = new productModel(product);
      await newProduct.save();
      console.log(`Added product: ${product.name}`);
    }

    console.log("Product import completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error importing products:", error);
    process.exit(1);
  }
}

// Run the import function
importProducts();
