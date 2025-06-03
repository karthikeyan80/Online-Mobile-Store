# Product Import Scripts

This directory contains scripts for importing products into the database.

## Available Scripts

### `importProducts.js`

This script attempts to import products from the frontend assets folder by parsing the assets.js file and uploading the images to Cloudinary. It's the original implementation.

```
npm run import-products
```

### `importProductsSimple.js`

This script imports a predefined set of products with sample image URLs. Useful for testing without uploading images.

```
npm run import-products-simple
```

### `importProductsWithImages.js`

This script imports a predefined set of products with real image URLs from Unsplash. Useful for testing with real images without uploading.

```
npm run import-products-with-images
```

### `importAssetsProducts.js`

This script imports products from the frontend assets folder by parsing the assets.js file and uploading the actual images to Cloudinary.

```
npm run import-assets-products
```

### `checkProducts.js`

This script checks which products from assets.js are missing from the database and which products in the database are not in assets.js.

```
npm run check-products
```

### `addMissingProducts.js`

This script adds only the products from assets.js that are missing from the database.

```
npm run add-missing-products
```

## Usage

To import all products from the assets folder:

```
npm run import-assets-products
```

To check which products are missing:

```
npm run check-products
```

To add only the missing products:

```
npm run add-missing-products
```
