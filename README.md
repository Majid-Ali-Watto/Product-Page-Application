# Shopping Cart App

This is a simple Shopping Cart App built with React. It allows users to browse products, add them to a cart, update quantities, and remove items. The app uses localStorage to persist the cart state, ensuring that the user's cart is saved even after refreshing the page.

### Features

**Product Listing:** Displays a list of products fetched from an API.

**Search Functionality:** Allows users to search for products by title or category.

**Infinite Scroll:** Automatically loads more products as the user scrolls down.

**Shopping Cart:**

1. Add products to the cart.

2. Update the quantity of items in the cart.

3. Remove items from the cart.

4. View the total price of all items in the cart.

**Persistent Cart:** The cart is saved to localStorage and persists across page refreshes.

**Technologies Used**

**React**: A JavaScript library for building user interfaces.

**React Context API**: For state management (cart state).

**Axios**: For making HTTP requests to fetch products.

**Intersection Observer API**: For implementing infinite scroll.

**CSS**: For styling the components.

### Installation

Follow these steps to set up the project locally:

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/shopping-cart-app.git
    cd shopping-cart-app
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm run dev
    ```

### Code Overview

**useProducts Hook**

Fetches products from the API and manages the product list, search, and pagination.

**CartContext**

Manages the cart state and provides functions to add, remove, and update items in the cart.

**Components**

**ProductList**: Displays the list of products and handles infinite scroll.

**ProductItem**: Represents a single product with an "Add to Cart" button.

**Cart**: Displays the shopping cart and allows users to update quantities or remove items.

**SearchBar**: Allows users to search for products.
