# Modifying the Product List widget

This guide outlines the process of modifying the "storefront-product-listing-page" widget.

Navigate to the Block's Directory

```bash
cd blocks/product-list
```

Clone the Repository

```bash
git clone git@github.com:adobe/storefront-product-listing-page.git
```

Enter the Repository Directory

```bash
cd storefront-product-listing-page
```

Apply Existing Modifications

```bash
git apply ../search.patch
```

Install Dependencies

```bash
npm install
```

Start Development Server

```bash
npm run dev
```

Modify the Code

Build the Widget

```bash
npm run build
```

Move the Dist File

```bash
mv dist/search.js ../search.js
```

Create a Patch of Your Changes

```bash
git diff > ../search.patch
```
