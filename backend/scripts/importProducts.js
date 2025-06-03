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
    const result = await cloudinary.uploader.upload(imagePath, {
      resource_type: "image",
    });
    return result.secure_url;
  } catch (error) {
    console.error(`Error uploading image ${imagePath}:`, error);
    throw error;
  }
}

// Main function to import products
async function importProducts() {
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

    // Parse the products array
    const productsString = `[${productsMatch[1]}]`;

    // Replace image references with their file paths
    let processedString = productsString;
    const imageRegex = /image: \[(.*?)\]/g;
    const imageMatches = [...productsString.matchAll(imageRegex)];

    for (const match of imageMatches) {
      const imageRefs = match[1].split(",").map((ref) => ref.trim());
      const imagePaths = imageRefs
        .map((ref) => {
          // Extract the image filename (e.g., p_img1 from p_img1)
          const imgName = ref.match(/p_img\d+(?:_\d+)?/);
          if (imgName) {
            // Find the corresponding image file in the assets directory
            const files = fs.readdirSync(assetsDir);
            const imgFile = files.find(
              (file) =>
                file.startsWith(imgName[0]) &&
                (file.endsWith(".jpg") ||
                  file.endsWith(".png") ||
                  file.endsWith(".jpeg"))
            );

            if (imgFile) {
              return path.join(assetsDir, imgFile);
            }
          }
          return null;
        })
        .filter(Boolean);

      // Replace the image references with the actual file paths
      processedString = processedString.replace(
        match[0],
        `image: ${JSON.stringify(imagePaths)}`
      );
    }

    // Evaluate the processed string to get the products array
    // Note: This is a simplified approach and might not work for all cases
    // In a production environment, you'd want to use a more robust parsing method
    const productsData = JSON.parse(
      processedString
        .replace(/(\w+):/g, '"$1":') // Convert property names to strings
        .replace(/'/g, '"') // Replace single quotes with double quotes
        .replace(/,(\s*[\]}])/g, "$1") // Remove trailing commas
    );

    console.log(`Found ${productsData.length} products in assets.js`);

    // Process each product
    for (const product of productsData) {
      // Check if product already exists in the database
      const existingProduct = await productModel.findOne({
        name: product.name,
      });

      if (existingProduct) {
        console.log(`Product "${product.name}" already exists, skipping...`);
        continue;
      }

      // Upload images to Cloudinary
      const imageUrls = [];
      for (const imagePath of product.image) {
        try {
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

    console.log("Product import completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error importing products:", error);
    process.exit(1);
  }
}

// Run the import function
importProducts();
