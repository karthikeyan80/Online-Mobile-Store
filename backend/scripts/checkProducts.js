import dotenv from "dotenv";
import connectDB from "../config/mongodb.js";
import productModel from "../models/productModel.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the frontend assets directory
const assetsDir = path.join(__dirname, "../../frontend/src/assets");

async function checkProducts() {
  try {
    // Read the assets.js file content
    const assetsJsPath = path.join(assetsDir, "assets.js");
    const assetsJsContent = fs.readFileSync(assetsJsPath, "utf8");

    // Extract the products array using regex
    const productsMatch = assetsJsContent.match(
      /export const products = \[([\s\S]*?)\];/
    );

    if (!productsMatch) {
      console.error("Could not find products array in assets.js");
      return;
    }

    // Extract product names using regex
    const productRegex = /name:\s*"([^"]+)"/g;
    const assetProductNames = [];
    let match;

    while ((match = productRegex.exec(productsMatch[0])) !== null) {
      assetProductNames.push(match[1]);
    }

    console.log(`Found ${assetProductNames.length} products in assets.js`);

    // Get all products from the database
    const dbProducts = await productModel.find({}, "name");
    const dbProductNames = dbProducts.map((product) => product.name);

    console.log(`Found ${dbProductNames.length} products in the database`);

    // Find products in assets.js that are not in the database
    const missingProducts = assetProductNames.filter(
      (name) => !dbProductNames.includes(name)
    );

    if (missingProducts.length > 0) {
      console.log(`\nMissing products (${missingProducts.length}):`);
      missingProducts.forEach((name) => console.log(`- ${name}`));
    } else {
      console.log("\nAll products from assets.js are in the database.");
    }

    // Find products in the database that are not in assets.js
    const extraProducts = dbProductNames.filter(
      (name) => !assetProductNames.includes(name)
    );

    if (extraProducts.length > 0) {
      console.log(`\nExtra products in database (${extraProducts.length}):`);
      extraProducts.forEach((name) => console.log(`- ${name}`));
    } else {
      console.log("\nNo extra products in the database.");
    }

    process.exit(0);
  } catch (error) {
    console.error("Error checking products:", error);
    process.exit(1);
  }
}

// Run the check function
checkProducts();
