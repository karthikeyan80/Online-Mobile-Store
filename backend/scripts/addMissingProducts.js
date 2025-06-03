import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import connectDB from "../config/mongodb.js";
import connectCloudinary from "../config/cloudinary.js";
import productModel from "../models/productModel.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB and Cloudinary
connectDB();
connectCloudinary();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the frontend assets directory
const assetsDir = path.join(__dirname, "../../frontend/src/assets");

// Function to upload an image to Cloudinary
async function uploadImageToCloudinary(imagePath) {
  try {
    console.log(`Uploading image: ${imagePath}`);
    const result = await cloudinary.uploader.upload(imagePath, {
      resource_type: "image",
    });
    return result.secure_url;
  } catch (error) {
    console.error(`Error uploading image ${imagePath}:`, error);
    throw error;
  }
}

// Main function to import missing products
async function importMissingProducts() {
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

    // Get all products from the database
    const dbProducts = await productModel.find({}, "name");
    const dbProductNames = dbProducts.map((product) => product.name);

    console.log(`Found ${dbProductNames.length} products in the database`);

    // Extract product data using regex
    const productRegex =
      /{[\s\S]*?_id:\s*"([^"]+)"[\s\S]*?name:\s*"([^"]+)"[\s\S]*?image:\s*\[(.*?)\][\s\S]*?price:\s*(\d+)[\s\S]*?date:\s*(\d+)[\s\S]*?bestseller:\s*(true|false)[\s\S]*?RAM\s*:\s*(\[[^\]]+\])[\s\S]*?description\s*:\s*"([^"]+)"[\s\S]*?brand\s*:\s*"([^"]+)"[\s\S]*?}/g;

    const products = [];
    let match;
    while ((match = productRegex.exec(productsMatch[0])) !== null) {
      const productName = match[2];

      // Skip if product already exists in the database
      if (dbProductNames.includes(productName)) {
        continue;
      }

      const imageRefs = match[3].split(",").map((ref) => ref.trim());

      // Extract image filenames
      const imageFilenames = [];
      for (const ref of imageRefs) {
        const imgNameMatch = ref.match(/p_img\d+(?:_\d+)?/);
        if (imgNameMatch) {
          const imgName = imgNameMatch[0];
          // Find matching image files
          const files = fs.readdirSync(assetsDir);
          const imgFiles = files.filter(
            (file) =>
              file.startsWith(imgName) &&
              (file.endsWith(".jpg") ||
                file.endsWith(".png") ||
                file.endsWith(".jpeg"))
          );

          if (imgFiles.length > 0) {
            imageFilenames.push(imgFiles[0]);
          }
        }
      }

      // Parse RAM array
      let ramArray;
      try {
        ramArray = JSON.parse(match[7].replace(/'/g, '"'));
      } catch (error) {
        console.error(`Error parsing RAM array for ${productName}:`, error);
        ramArray = ["8GB"];
      }

      products.push({
        _id: match[1],
        name: productName,
        imageFiles: imageFilenames,
        price: parseInt(match[4]),
        date: parseInt(match[5]),
        bestseller: match[6] === "true",
        RAM: ramArray,
        description: match[8],
        brand: match[9],
      });
    }

    console.log(`Found ${products.length} missing products to add`);

    // Process each product
    for (const product of products) {
      // Upload images to Cloudinary
      const imageUrls = [];
      for (const imageFile of product.imageFiles) {
        try {
          const imagePath = path.join(assetsDir, imageFile);
          const imageUrl = await uploadImageToCloudinary(imagePath);
          imageUrls.push(imageUrl);
        } catch (error) {
          console.error(`Error uploading image for ${product.name}:`, error);
        }
      }

      if (imageUrls.length === 0) {
        console.error(
          `No images could be uploaded for ${product.name}, skipping...`
        );
        continue;
      }

      // Create product data
      const productData = {
        name: product.name,
        description: product.description,
        price: product.price,
        RAM: product.RAM,
        brand: product.brand,
        bestseller: product.bestseller,
        image: imageUrls,
        date: new Date().getTime(),
      };

      // Save product to database
      const newProduct = new productModel(productData);
      await newProduct.save();
      console.log(`Added product: ${product.name}`);
    }

    console.log("Missing products import completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error importing missing products:", error);
    process.exit(1);
  }
}

// Run the import function
importMissingProducts();
