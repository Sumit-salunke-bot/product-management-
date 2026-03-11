# Product Management Dashboard

A modern, responsive Product Management Dashboard built with React, Vite, and Tailwind CSS. It interacts with the FakeStoreAPI to display, create, edit, and delete products, featuring a clean UI with real-time searching, category filtering, and pagination.

## Features Implemented

1. **Product List Dashboard**: Displays products in a responsive grid layout.
2. **Add/Edit Product**: A modal form with validation to add new products or edit existing ones.
3. **Delete Product**: Delete products with optimistic UI updates.
4. **Debounced Search**: Search products securely by name with a 300ms debounce.
5. **Category Filtering**: Filter products by their distinct categories.
6. **Pagination**: Browse products elegantly with numbered pagination pages.
7. **Loading & Error States**: Graceful UI feedback for network requests operations.
8. **Premium UI**: Uses Tailwind CSS, Lucide icons, glassmorphism hints, and animations.

## System Requirements

- Node.js (v16.x or newer)
- npm or yarn

## Setup Instructions

1. **Clone the repository** (if downloaded as a zip, simply extract it):
   ```bash
   git clone <repository_url>
   cd product-management-dashboard
   ```

2. **Install local dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

The application will be available at `http://localhost:5173/` by default.

## Architecture Guidelines

- **`components/`**: Houses all reusable UI pieces, structured modularly.
- **`pages/`**: Contains top-level route views (like Dashboard).
- **`hooks/`**: Includes `useProducts` for encapsulating data fetching logic and complex states.
- **`services/`**: Holds `api.js` for handling external integrations.

_Note: This application mimics adding/updating/deleting products via the FakeStore API since the API is read-only for those operations but returns simulated success responses._

# product-management-
