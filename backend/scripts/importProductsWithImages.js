import dotenv from "dotenv";
import connectDB from "../config/mongodb.js";
import productModel from "../models/productModel.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Real image URLs from a public source
const phoneImages = [
  "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1585060544812-6b45742d762f?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=1000&auto=format&fit=crop",
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
        image: [phoneImages[0], phoneImages[1]],
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
        image: [phoneImages[2], phoneImages[3]],
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
        image: [phoneImages[4]],
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
        image: [phoneImages[5]],
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
        image: [phoneImages[6]],
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
        image: [phoneImages[7]],
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
        image: [phoneImages[0]],
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
        image: [phoneImages[1]],
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
        image: [phoneImages[2]],
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
        image: [phoneImages[3]],
        date: new Date().getTime(),
      },
      {
        name: "Poco F6 5G",
        description:
          "The Poco F6 5G is a budget-friendly smartphone that offers a stunning 6.67-inch AMOLED display, powered by the latest Snapdragon processor for smooth performance. With its versatile camera system and MIUI for POCO, it provides a great user experience without breaking the bank.",
        price: 50000,
        RAM: ["8GB", "12GB"],
        brand: "Poco",
        bestseller: false,
        image: [phoneImages[4]],
        date: new Date().getTime(),
      },
      {
        name: "Infinix GT 20 Pro",
        description:
          "The Infinix GT 20 Pro is a powerful smartphone that offers an immersive 6.67-inch AMOLED display, MediaTek processor for smooth performance, and a versatile camera system for stunning photography. With its sleek design, long-lasting battery, and XOS for a smooth user experience, the GT 20 Pro is perfect for gamers and multimedia enthusiasts.",
        price: 50000,
        RAM: ["8GB", "12GB"],
        brand: "Infinix",
        bestseller: false,
        image: [phoneImages[5]],
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
