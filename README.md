# E-Commerce App

A fully-featured e-commerce application built with React, featuring product
listings, search/filter/sort functionality, shopping cart, checkout process, and
product reviews.

## 🚀 Live Demo

**Vercel Deployment:**
[https://ecommerce-app-psi-dusky.vercel.appp](https://ecommerce-app-psi-dusky.vercel.app)

## 📋 Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Hamington2021/ecommerce-app.git
   cd ecommerce-app
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm start
   ```

4. **Open your browser:** Navigate to
   [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Follow the prompts to deploy your application.

## ✨ Features

### 1. Product Listings

- Fetches products from DummyJSON API
- Displays product cards with:
  - Product image
  - Title
  - Price (with discount badges if applicable)
  - Category
  - Star ratings (dynamically updated with user reviews)
  - "Add to Cart" button

### 2. Product Detail Page

- High-resolution image gallery with thumbnails
- Complete product information:
  - Title, brand, and category
  - Description
  - Dynamic ratings (combines API and user reviews)
  - Price with discount display
  - Stock availability
  - Warranty and shipping information
- User reviews section (API + user-submitted)
- Review submission form
- Add to cart functionality

### 3. Shopping Cart

- Add/remove products
- Increase/decrease quantity controls
- Dynamic price calculations
- Total item count displayed in header
- Cart persistence using localStorage
- Order summary with tax calculation

### 4. Search, Filter & Sort

- **Search Bar**: Filter products by name
- **Category Filter**: Filter by product category
- **Price Range Filter**: Set min/max price
- **Sort Options**:
  - Price: Low to High
  - Price: High to Low
  - Highest Rating
  - Name: A to Z

### 5. Product Reviews

- Submit reviews with:
  - Star rating (1-5)
  - Review text
  - Optional reviewer name
- Reviews persist in localStorage
- Displays both API reviews and user-submitted reviews
- Dynamic average rating calculation updated across:
  - Product listing cards
  - Product detail page

### 6. Responsive Design

- Mobile-first approach
- Breakpoints for mobile, tablet, and desktop
- Touch-friendly interface elements
- Adaptive layouts for all screen sizes

### 7. Routing (React Router)

- `/` - Home (product listings)
- `/product/:id` - Product detail page
- `/cart` - Shopping cart
- `/checkout` - Checkout form
- `/order-confirmation` - Order success page

### 8. Local Storage Integration

- **Cart Contents**: Persists across browser sessions
- **User Reviews**: Stores all submitted reviews per product
- **Order Data**: Saves last order for confirmation page

### 9. Footer

- Quick links (Home, Cart, About, Contact, FAQ)
- Customer service links
- Social media icons (Facebook, Twitter, Instagram, LinkedIn)
- Newsletter subscription form
- Copyright information

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

## Technologies Used

- **React 19.2.0** - UI library
- **React Router DOM 7.9.6** - Client-side routing
- **Axios 1.13.2** - HTTP client for API requests
- **DummyJSON API** - Product data source
- **LocalStorage API** - Client-side data persistence
- **CSS3** - Styling with responsive design

## 👥 Team Members

Serena Shushack Pascale Fontaine

## 📁 Project Structure

```
ecommerce-app/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/      # Reusable React components
│   │   ├── CartItem.jsx
│   │   ├── CheckoutSummary.jsx
│   │   ├── FilterSidebar.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductCard.jsx
│   │   ├── RatingStars.jsx
│   │   ├── ReviewForm.jsx
│   │   ├── ReviewList.jsx
│   │   ├── SearchBar.jsx
│   │   └── SortDropdown.jsx
│   ├── pages/           # Page-level components
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Home.jsx
│   │   ├── OrderConfirmation.jsx
│   │   └── ProductDetail.jsx
│   ├── services/        # API and localStorage utilities
│   │   ├── api.js
│   │   └── localStorage.js
│   ├── styles/          # CSS files
│   │   ├── main.css
│   │   ├── responsive.css
│   │   └── ProductDetail.css
│   ├── App.jsx
│   ├── index.jsx
│   └── index.css
├── package.json
└── README.md
```
